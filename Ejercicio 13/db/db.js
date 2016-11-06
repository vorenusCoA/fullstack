var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/testClase';
var mongoDB = {};

function connectToMongo(callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
            	return console.log(err);
            }
            mongoDB.db = db;
            console.log("Conexion establecida");
            callback(null, db);
        });
}

module.exports = {
	mongoDB : mongoDB,
	connectToMongo : connectToMongo
}