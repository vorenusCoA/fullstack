var express = require('express');
var app = express();
var users = require('./routes/users.js');
var list = require('./routes/list.js');
var parser = require('./middlewares/parser.js');
var tokenValidator = require('./middlewares/tokenValidator.js');
var mongo = require('./db/db.js').db;

mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', function() {

    app.use(parser.parser);
	app.use(users);
	app.use(tokenValidator.tokenValidator);
	app.use(list);

	app.listen(3000, function (err) {
	if(err) return console.log(err);
	console.log('Example app listening on port 3000!');
	});

});
