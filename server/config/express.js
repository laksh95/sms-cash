let path= require('path');
let express= require('express');
let bodyParser = require('body-parser');
let passport = require('passport');
let init=function(app){
	//var public= path.resolve(__dirname +"/../../client/public" );
	//app.use(express.static(public));
    app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
     res.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type, origin, authorization, accept, client-security-token");
     	if('OPTIONS' == req.method)
           res.send(200);
     next();
    });
    const localLoginStrategy = require('./../passport/loginStrategy');
	passport.use('local-login', localLoginStrategy);

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(passport.initialize());

	// pass the authentication checker middleware
	const authCheckMiddleware = require('./expressAuthCheck');
	app.use('/api', authCheckMiddleware);

}
module.exports=init;
