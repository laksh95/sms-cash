//var controller=require('./../controller/controller');
var apiUser= require('./../api/userDetail');
//var apiAdrs= require('./../api/addresses');

var path= require('path');

module.exports=function(app){
	console.log("In routes file");
	const authRoutes = require('./authRoute');
	// const apiRoutes = require('./apiRoute');
	app.use('/auth', authRoutes);
	//app.use('/api',require('./apiRoute')(app));
	app.use('/api/department',require('../api/department'));
    app.use('/api/course',require('../api/course'));
};
