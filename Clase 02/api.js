var fs = require('fs');

function leerDirectorio(directorio){
	fs.readdir(directorio, function(err, files){
		if(err) return console.log(err);
		console.log(files);
	})
}

function readFile(archivo){
	fs.readFile(archivo, function(err, data){
		if(err) return console.log(err);
		console.log(data.toString());
	})
}

function readFileSync(archivo){
	var data = fs.readFileSync(archivo);
	console.log(data.toString());
}

module.exports = {
	readFile : readFile,
	readFileSync : readFileSync,
	leerDirectorio : leerDirectorio
}
