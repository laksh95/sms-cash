//var controller=require('./../controller/controller');
var apiUser= require('./../api/userDetail');
//var apiAdrs= require('./../api/addresses');

var path= require('path');

module.exports=function(app){
	console.log("In routes file");

	// routes
	const authRoutes = require('./authRoute');
	const apiRoutes = require('./apiRoute');
	app.use('/auth', authRoutes);
	app.use('/api', apiRoutes);
};
