//var controller=require('./../controller/controller');
var apiUser= require('./../api/userDetail');
//var apiAdrs= require('./../api/addresses');

var path= require('path');

module.exports=function(app){
	console.log("In routes file");
	app.use('/api/userDetail', apiUser);
	//app.use('/api/adrs', apiAdrs);

	// app.get('/', function(request, response){
	// 	response.sendFile(path.resolve(__dirname + "/../../client/emp.html"));
	// });



};
