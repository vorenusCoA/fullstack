var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testClase14');

var db = mongoose.connection;

module.exports = {
	db : db,
}
