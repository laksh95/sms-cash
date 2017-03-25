let express = require('express')
let path = require('path')
let bodyParser = require('body-parser');

let init = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", req.headers.origin);
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
}

module.exports = init;
