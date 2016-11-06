var express = require('express');
var app = express();
var fs = require('fs');
var formidable = require('formidable');

function readFile(archivo, res) {
	var htmlFile;
	fs.readFile(archivo, function(err, data) {
  		if (err) return console.log(err);    
  		htmlFile = data.toString();
  		res.end(htmlFile);
	});  
}

app.get('/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	readFile("index.html", res);
})

app.post('/upload', function (req, res) {
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	// carpeta en donde se guardaran los archivos recibidos
	form.uploadDir = "./uploadedFiles/";

	form.on('fileBegin', function(name, file) {
		console.log("comenzó la subida de un arhivo");
	});

	form.on('end', function() {
		console.log("Terminó la subida del archivo");
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('received upload:\n\n');
		res.end();	
	});

	// linkeamos el objecto request a la variable form
	form.parse(req);    
})

app.listen(3000, function (err) {
	if(err) return console.log(err);
	console.log('Example app listening on port 3000!');
});
