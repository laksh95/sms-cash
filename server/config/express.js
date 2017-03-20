var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');

var init = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
}

module.exports = init;