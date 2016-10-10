var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
//app.use(express.static('public'));

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/', function(req, res){
	var data = '';
	req.on('data', function(chunck){
		data += chunck;
	})
	req.on('end', function(){
		res.write(data);
		res.end();	
	})		
})

app.get('/file', function(req, res){
	var options = {
	    root: __dirname + '/public/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
    	}
  };
	res.sendFile("index.html", options, function(err){
		if(err){
			console.log(err);
			res.end();	
		}		
	});
})

app.listen(3000, function (err) {
	if(err) return console.log(err);
	console.log('Example app listening on port 3000!');
});
