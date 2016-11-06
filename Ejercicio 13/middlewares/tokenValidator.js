var utils = require('../utils/utils.js');

function tokenValidator (req, res, next){
	var token = req.get("token");
	if(token == null){
		res.status(400).send("Es necesario enviar un token");
		return;
	}
	if(!utils.doesTokenExists(token)){
		res.status(400).send("Token incorrecto");
		return
	}
	req.username = utils.getUsername(token);
	req.token = token;
	next();
}

module.exports = {
	tokenValidator : tokenValidator
}
