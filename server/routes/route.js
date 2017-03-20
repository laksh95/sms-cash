var express = require('express');
var path = require('path');

function routeLogin(app){
	console.log("heeloo");
	app.use('/api/academicCalendar', require(path.resolve(__dirname+"/../api/academicCalendar/index.js")));
	app.use('/api/parent', require(path.resolve(__dirname+"/../api/parent/index.js")));
	/*app.use('/api/personalCalendar', require(path.resolve(__dirname+"/../api/personalCalendar/index.js")));*/
}	
module.exports = routeLogin;