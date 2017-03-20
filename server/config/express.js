let express= require('express');
let bodyParser= require('body-parser');
let path = require('path');
let init=function(app){
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
}
module.exports=init