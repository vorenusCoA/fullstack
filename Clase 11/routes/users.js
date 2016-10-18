var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

var jwt = require('jwt-simple');
var secret = 'soyunsecreto';

var tokenValidator = require('../middlewares/tokenValidator.js');

router.post('/login', function (req, res) {
	var username = req.body.username;
	var pass = req.body.pass;
	for(var i = 0; i < db.users.length; i++){
		if(db.users[i].username == username){
			if(db.users[i].pass == pass){
				res.status(200).send("Tu token es: " + db.users[i].token);
				return;
			} else {
				res.status(400).send("Pass incorrecta");
				return;
			}
		} 
	}
	res.status(400).send("User no registrado");
});

router.post('/signup', function(req, res){
	var username = req.body.username;
	var pass = req.body.pass;
	var initialTokenVersion = 1;
	var payload = { username : username, tokenVersion : initialTokenVersion};
	var token = jwt.encode(payload, secret);
	for(var i = 0; i < db.users.length; i++){
		if(db.users[i].username == username){
			res.status(400).send("Usuario existente. Elija otro nombre");
			return;
		}
	}
	var newUser = {
		username: username,
		pass: pass,
		token: token,
		tokenVersion : initialTokenVersion
	}

	var newLista = {
		username: username,
		actividades: []
	}

	db.users.push(newUser);
	db.listasDeActividades.push(newLista);
	console.log(db.users);
	console.log(db.listasDeActividades)

	res.status(200).send("Usuario creado");
})

router.use(tokenValidator.tokenValidator);

router.put('/newpass', function (req, res) {
	var token = req.token;
	var decoded = jwt.decode(token, secret);
	var username = decoded.username;
	var tokenVersion = decoded.tokenVersion;
	var pass = req.body.pass;
	var newpass = req.body.newpass;
	for(var i = 0; i < db.users.length; i++){
		if(db.users[i].username == username){
			if(db.users[i].pass == pass){
				db.users[i].pass = newpass;
				db.users[i].tokenVersion++;
				var payload = { username : username, tokenVersion : db.users[i].tokenVersion};
				var token = jwt.encode(payload, secret);
				db.users[i].token = token;
				res.status(200).send("Pass actualizada!");
				return;
			} else {
				res.status(400).send("Pass incorrecta");
				return;
			}
		} 
	}	
})

module.exports = router;
