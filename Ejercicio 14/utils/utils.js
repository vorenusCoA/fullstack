var mongo = require('../db/db.js').db;
var userModel = require('../models/userModel.js');

function getUsername (token, callback) {
	userModel.find({ token : token}, function (err, data){
		if (err) return console.log(err);
		callback(data.name);
	})
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

function doesTokenExists (token, callback) {
	var exists = false;
	userModel.find({ token : token}, function (err, data){
		if (data != 0) {
			console.log("Existe el token");
			exists = true;
			callback(exists);
		} else {
			callback(exists);
		}
	});	
}

module.exports = {
	doesTokenExists : doesTokenExists,
	getListaActividades : getListaActividades,
	getUsername : getUsername
}
