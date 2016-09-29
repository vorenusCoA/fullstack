var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var actividades =["Aprender eventos", "Aprender streams", "Aprender http"];

var server = http.createServer(function(req, res){

  req.setEncoding("utf8");  

  function readFile(archivo, res) {
    var htmlFile;
    fs.readFile(archivo, function(err, data) {
      if (err) return console.log(err);    
        htmlFile = data.toString();
        var listado = '';
        for(var i = 0; i < actividades.length; i++) {
          listado+="<li>" + actividades[i] + "</li>";
        }
        htmlFile = htmlFile.replace("%", listado);
        res.end(htmlFile);
    });  
  }  

  if(req.method === "GET"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    readFile("index.html", res);  
  }

  if(req.method === "POST"){
    if(req.url === "/"){
      var data = "";
      req.on('data', function(chunck){
        data += chunck;
      })
      req.on('end', function(){
        res.writeHead(200, {'Content-Type': 'text/html'});        
        var body = qs.parse(data)         
        actividades.push(body.actividadNew);
        readFile("index.html", res);  
      })  
    }        
  }

  if(req.method === "PUT"){
    var path = req.url;
    var id = path.substring(1);
    console.log(id);
    if(isNaN(id)) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write("El ID tiene que ser un número.");
      res.end();
      return;  
    }
    if(actividades[id] == null){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("ID no encontrado!");
      res.end();
      return;  
    }      
    var data = "";        
    req.on('data', function(chunck){
      data += chunck;
    })
    req.on('end', function(){
      res.writeHead(200, {'Content-Type': 'text/plain'});  
      actividades[id - 1] = data;
      res.write("Actividad actualizada!");
      res.end();  
    })      
  }  

  if(req.method === "DELETE"){
    var path = req.url;
    var id = path.substring(1);
    console.log(id);
    if(isNaN(id)) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write("El ID tiene que ser un número.");
      res.end(); 
      return; 
    }
    if(actividades[id] == null){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("ID no encontrado!");
      res.end();  
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    actividades.splice(id - 1, 1);
    res.write("Actividad eliminada!");
    res.end();
  }

});

server.listen(3000, function(err){
	if(err) return console.log(err);
	console.log("Server running at localhost:3000");
});
