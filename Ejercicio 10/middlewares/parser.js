// Parser "simil" al JSON parser
function parseador(req, res, next){
	req.setEncoding("utf8");
	if(req.method == "POST" || req.method == "PUT"){
		var data = '';
		req.on("data", function(chunck){
			data += chunck;
		})
		req.on("end", function(){
			try {
				req.body = JSON.parse(data);
				next();	
			} catch(err){
				res.status(400).send('JSON inválido');
			}		
		})	
	} else {
		next();
	}		
}

module.exports = {
	parser : parseador
}
