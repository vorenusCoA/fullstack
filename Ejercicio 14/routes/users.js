var express = require('express');
var router = express.Router();
var mongo = require('../db/db.js').db;
var userModel = require('../models/userModel.js');

var jwt = require('jwt-simple');
var secret = 'soyunsecreto';

var tokenValidator = require('../middlewares/tokenValidator.js');

router.post('/login', function (req, res) {
	var username = req.body.username;
	var pass = req.body.pass;

	// Compruebo la pass y devuelvo token
	userModel.find({ name : username}, function (err, data){
		if (data.length != 0) {
			if (data[0].pass == pass) {
				res.status(200).send("Tu token es: " + data[0].token);
			} else {
				res.status(400).send("Pass incorrecta");
			}
		} else {
			res.status(400).send("Usuario inexistente");
		}		
	});
});

router.post('/signup', function(req, res){

	var username = req.body.username;
	var pass = req.body.pass;
	var initialTokenVersion = 1;
	var payload = { username : username, tokenVersion : initialTokenVersion};
	var token = jwt.encode(payload, secret);

	// Compruebo si ya existe el nombre de usuario
	userModel.find({ name : username}, function (err, data){
		console.log(data);
		if (data.length != 0) {
			res.status(400).send("Usuario existente. Elija otro nombre");
			return;
		} else {
			var newUser = new userModel({ name: username, pass: pass, token: token, tokenVersion: 1 });
			newUser.save(function (err, data) {
  				if (err) return console.error(err);
  				console.log("Usuario creado");
  				res.status(200).send("Usuario creado");
			});
		}
	})
})

router.use(tokenValidator.tokenValidator);

router.put('/newpass', function (req, res) {
	var token = req.token;
	var decoded = jwt.decode(token, secret);
	var username = decoded.username;
	var tokenVersion = decoded.tokenVersion;
	var pass = req.body.pass;
	var newpass = req.body.newpass;

	userModel.find({ name : username}, function (err, data){
		if (data.length != 0) {
			if (data[0].pass == pass) {
				data[0].pass  = newpass;
				data[0].tokenVersion++;
				var payload = { username : username, tokenVersion : data[0].tokenVersion};
				var token = jwt.encode(payload, secret);
				data[0].token = token;
				data[0].save(function (err, data) {
					if (err) return console.log(err);
					res.status(200).send("Tu token es: " + data[0].token);	
				});				
			} else {
				res.status(400).send("Pass incorrecta");
			}
		} else {
			res.status(400).send("Usuario inexistente");
		}		
	});
})

module.exports = router;
