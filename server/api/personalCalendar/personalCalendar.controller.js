var pg = require("pg");
var express = require('express');
var personalCalendar = require('./../personalCalendar/personalCalendar.model.js')
var db=require('./../../sqldb')();

var dashboardHandler = {
	addPersonalEvent: function(request, response){
		let inputData = getData(request, response)
		personalCalendar().addHolidays(db, inputData, (status)=>{
			response.send(status)
		})
	}
}

function getData(request, response){
	let data = {
		heading: request.body.heading,
       	startDate: new Date(request.body.startDate),
    	endDate: new Date(request.body.endDate),
        content: request.body.content
	}
	return data;
}

module.exports = dashboardHandler;