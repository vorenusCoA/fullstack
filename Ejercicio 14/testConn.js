var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var async = require('async');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  console.log("Estamos conectados");

  var kittySchema = mongoose.Schema({
  	name: String
  });

  var Kitten = mongoose.model('Kitten', kittySchema);

  var silence = new Kitten({ name: 'Silence' });
	console.log(silence.name); // 'Silence'

	// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
	// kittySchema.methods.speak = function () {
 //  	var greeting = this.name
 //    ? "Meow name is " + this.name
 //    : "I don't have a name";
 //  	console.log(greeting);
	// }

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak(); // "Meow name is fluffy"

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
  // fluffy.speak();

 //  Kitten.find(function (err, kittens) {
 //  if (err) return console.error(err);
 //  console.log(kittens);
	// })

// });


//corregir
Kitten.find(function (err, datos){

	console.log(datos);
	async.each(datos, function (dato, callback){
		dato.name = "Pepe";
		dato.save();
		callback();
	}, function (err) {
		if (err) return console.log(err);
		console.log("Data actualizada");
		Kitten.find(function (err, data){
			console.log(data);
		})
	})

	// console.log(data);

	// for (var i = 0; i < data.length; i++) {
	// 	data[i].name = "jose";
	// 	data[i].save();
	// }

});



// Kitten.find(function (err, data){
// 	console.log("Deberia estar despues de actualizar");
// 	console.log(data);
// });

});