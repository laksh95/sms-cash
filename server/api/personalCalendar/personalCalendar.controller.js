var pg = require("pg");
var express = require('express');
var personalCalendar = require('./../personalCalendar/personalCalendar.model.js')
var db=require('./../../sqldb')();
var dashboardHandler = {
	//adding event from personal calendar
	addPersonalEvent: function(request, response){
		if(request !== null && request != undefined && request.user != null && request.user != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0){
			personalCalendar().addPersonalEvent(db, request, (status)=>{
				response.send(status)
			})
		}
		else{
			response.status(400).end()
		}
	},
	//deleting event from personal calendar
	deletePersonalEvent: (request, response) => {
		if(request !== null && request != undefined  && request.user != null && request.user != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0){
			personalCalendar().deletePersonalEvent(db, request.body, (status)=>{
				response.send(status)
			})
		}
		else{
			response.status(400).end()
		}
	}
}

module.exports = dashboardHandler;
