var eventos = require('events');
var EmisorEventos = eventos.EventEmitter;
var ee = new EmisorEventos();

var db = {
	personas: ["Pepe", "Juan", "Maria", "Silvia"],
	lastModified: Date.now()
}

function create(name){
	db.personas.push(name);
	db.lastModified = Date.now();
	ee.emit("createEnd", name, db.lastModified);
}

function find(name){
	var index = db.personas.indexOf(name);
	if(index != -1){
		ee.emit("findEnd", db.personas[index]);	
	} else {
		return console.log("Usuario inexistente: " + name);
	}	
}

function update(name, newName){
	var index = db.personas.indexOf(name);
	if(index != -1){
		db.personas[index] = newName;
		db.lastModified = Date.now();
		ee.emit("updateEnd", db.personas[index], name, db.lastModified);
	} else {
		return console.log("Usuario inexistente: " + name);
	}	
}

function deleteUser(name){
	console.log(db.personas);
	var index = db.personas.indexOf(name);
	if(index != -1){
		db.personas.splice(index, 1);		
		db.lastModified = Date.now();		
		ee.emit("deleteEnd", name, db);
	} else {
		return console.log("Usuario inexistente: " + name);
	}
}

module.exports = {
	create: create,
	update: update,
	find: find,
	deleteUser: deleteUser,
	ee: ee
}
