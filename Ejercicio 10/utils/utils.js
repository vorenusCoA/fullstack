var db = require('../db/db.js');

function getUsername (token) {
	var username = "";
	for (var i = 0; i < db.users.length; i++) {
		if(db.users[i].token == token){
			username = db.users[i].username;
			break;
		}			
	};
	return username;
}

function getListaActividades (username) {
	var lista = [];
	for (var i = 0; i < db.listasDeActividades.length; i++) {
		if(db.listasDeActividades[i].username == username){
			for (var j = 0; j < db.listasDeActividades[i].actividades.length; j++) {
				lista.push(db.listasDeActividades[i].actividades[j]);
			};
		}
	};
	return lista;
}

function doesTokenExists (token) {
	var exists = false;
	for (var i = 0; i < db.users.length; i++) {
		if(db.users[i].token == token){
			exists = true;
		}
	};
	return exists;
}

module.exports = {
	doesTokenExists : doesTokenExists,
	getListaActividades : getListaActividades,
	getUsername : getUsername
}
