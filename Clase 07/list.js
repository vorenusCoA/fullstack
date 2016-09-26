var http = require('http');

var actividades =["Aprender eventos", "Aprender streams", "Aprender http"];

var server = http.createServer(function(req, res){

  req.setEncoding("utf8");

  if(req.method === "GET"){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    for(var i = 0; i<actividades.length ; i++){
      res.write(actividades[i]);
      res.write("\n");
    }
    res.end();
  }

  if(req.method === "POST"){
    var data = "";
    req.on('data', function(chunck){
      data += chunck;
    })
    req.on('end', function(){
      res.writeHead(200, {'Content-Type': 'text/plain'});  
      actividades.push(data);
      for(var i = 0; i<actividades.length ; i++){
          res.write(actividades[i]);
          res.write("\n");                
      }
      res.end();  
    })    
  }

  if(req.method === "DELETE"){
      var id = req.url;
      if(!actividades[id]){
        error
      }
    req.on('data', function(){

    })
    
  }
  
  	  	

});

server.listen(3000, function(err){
	if(err) return console.log(err);
	console.log("Server running at localhost:3000");
});