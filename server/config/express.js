var path= require('path');
var express= require('express');
var bodyParser = require('body-parser');

var init=function(app){
	//var public= path.resolve(__dirname +"/../../client/public" );
	//app.use(express.static(public));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
}
module.exports=init;


