var path= require('path');
var express= require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var init=function(app){
    app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
     res.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type, origin, authorization, accept, client-security-token");
     if('OPTIONS' == req.method)
    		res.send(200);
     next();
    });


	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(passport.initialize());
	const authCheckMiddleware = require('./expressAuthCheck');
	app.use('/api', authCheckMiddleware);
}
module.exports=init;
