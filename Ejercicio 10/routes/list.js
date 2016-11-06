var express = require('express');
var router = express.Router();
var utils = require('../utils/utils.js');
var db = require('../db/db.js');

router.get('/list', function (req, res) {
	var lista = utils.getListaActividades(req.username);	
	res.status(200).send(lista);
})

router.post('/list', function (req, res) {
	var actividad = req.body;
	var username = req.username;
	for (var i = 0; i < db.listasDeActividades.length; i++) {
			if(db.listasDeActividades[i].username == username){
				db.listasDeActividades[i].actividades.push(actividad);
			}
	};
	console.log(db.listasDeActividades);
	res.status(200).send("Actividad agregada con éxito!");
})

router.put('/list/:id', function (req, res) {
	var newActividad = req.body;
	var username = req.username;
	var id = req.params.id;
	var actividades = utils.getListaActividades(username);
	if(isNaN(id)){
		res.status(400).send("El id de la lista debe ser un número");
		return;
	}
	if(actividades[id - 1] == null){
		res.status(400).send("El id es inexistente");
		return;	
	}
	for (var i = 0; i < db.listasDeActividades.length; i++) {
			if(db.listasDeActividades[i].username == username){
				db.listasDeActividades[i].actividades[id - 1] = newActividad;
			}
	};
	console.log(db.listasDeActividades);	
	res.status(200).send("Actividad actualizada!");
})

router.delete('/list/:id', function (req, res) {

})

module.exports = router;
