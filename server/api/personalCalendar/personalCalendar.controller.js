var pg = require("pg");
var express = require('express');
var personalCalendar = require('./../personalCalendar/personalCalendar.model.js')
var db=require('./../../sqldb')();

var dashboardHandler = {
	addPersonalEvent: function(request, response){ //adding event from personal calendar
		let inputData = getData(request, response)
		personalCalendar().addPersonalEvent(db, inputData, (status)=>{
			response.send(status)
		})
	},
	deletePersonalEvent: (request, response) => { //deleting event from personal calendar
		personalCalendar().deletePersonalEvent(db, request.body.id, (status)=>{
			response.send(status)
		})
	}
}

function getData(request, response){ //fetching data from front end
	let data = {
		heading: request.body.heading,
    startDate: new Date(request.body.startDate),
    endDate: new Date(request.body.endDate),
    content: request.body.content,
		userId: request.body.id
	}
	return data;
}

module.exports = dashboardHandler;
