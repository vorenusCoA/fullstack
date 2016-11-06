var express = require('express');
var app = express();
var users = require('./routes/users.js');
var list = require('./routes/list.js');
var parser = require('./middlewares/parser.js');
var tokenValidator = require('./middlewares/tokenValidator.js');

// Por el orden en que esta puesto, el tokenValidator solo lo utiliza el list
app.use(parser.parser);
app.use(users);
app.use(tokenValidator.tokenValidator);
app.use(list);

app.listen(3000, function (err) {
	if(err) return console.log(err);
	console.log('Example app listening on port 3000!');
});
