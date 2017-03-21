var path= require('path');
var express= require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var init=function(app){
	//var public= path.resolve(__dirname +"/../../client/public" );
	//app.use(express.static(public));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	//app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
	app.use(passport.initialize());
	app.use(passport.session());

	// pass the authenticaion checker middleware
	const authCheckMiddleware = require('./expressAuthCheck');
	app.use('/api', authCheckMiddleware);
	
	


}
module.exports=init;





