var fs = require("fs");

var eventos = require('events');
var EmisorEventos = eventos.EventEmitter;
var ee = new EmisorEventos();

function loadData(path){
	fs.readFile(path, function(err, data){
		if(err) return console.log(err);
		ee.emit("loaded", JSON.parse(data));	
	})	
}

module.exports = {
	loadData: loadData,
	ee : ee
} 
