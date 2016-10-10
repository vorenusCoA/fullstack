var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

router.post('/login', function (req, res) {
	var username = req.body.username;
	var pass = req.body.pass;
	var token = username + pass;
	for(var i = 0; i < db.users.length; i++){
		if(db.users[i].username == username){
			if(db.users[i].pass == pass){
				res.status(200).send("Tu token es: " + token);
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
	var token = username + pass;
	for(var i = 0; i < db.users.length; i++){
		if(db.users[i].username == username){
			res.status(400).send("Usuario existente. Elija otro nombre");
			return;
		}
	}
	var newUser = {
		username: username,
		pass: pass,
		token: token
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

module.exports = router;
