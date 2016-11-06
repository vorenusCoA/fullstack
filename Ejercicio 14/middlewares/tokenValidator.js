var utils = require('../utils/utils.js');

function tokenValidator (req, res, next){
	var token = req.get("token");
	if(token == null){
		res.status(400).send("Es necesario enviar un token");
		return;
	}
	utils.doesTokenExists(token, function (token) {
		if (!token) {
			console.log("Token incorrecto");
			res.status(400).send("Token incorrecto");
			return;
		} else {
			req.username = utils.getUsername(token);
			req.token = token;
			next();
		}
	})	
}

module.exports = {
	tokenValidator : tokenValidator
}
