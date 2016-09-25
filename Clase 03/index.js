var api = require("./api.js");

api.ee.on('createEnd', function(name, date){
   console.log("Usuario creado: " + name + ", Fecha: " + date); 
})

api.ee.on("findEnd", function(name){
	console.log("Usuario encontrado: " + name);		
})

api.ee.on("updateEnd", function(newName, name, date){
	console.log("Usuario actualizado: "+ name + ", Nuevo nombre: " + newName + ", Fecha: " + date);	
})

api.ee.on("deleteEnd", function(name, db){
	console.log("Usuario borrado: " + name + ", Fecha: " + db.lastModified);
	console.log(db.personas);
})

//api.create("Rodrigo");
//api.find("Pepe");
//api.update("Pepe", "Pedro");
//api.deleteUser("Pepe");
