var pg = require("pg");
var express = require('express');
var personalCalendar = require('./../personalCalendar/personalCalendar.model.js')
var db=require('./../../sqldb')();
var dashboardHandler = {
	//adding event from personal calendar
	addPersonalEvent: (request, response)=>{
		if(request !== null && request != undefined && request.user != null && request.user != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0){
			personalCalendar().addPersonalEvent(db, request)
			.then((data)=>{
				let dataToClient = {
					heading: data.heading,
					end_date: data.end_date,
					start_date: data.start_date,
					content: data.content,
					id: data.id
				}
				if(data.length === 0){
					response.status(200).json({ message: 'NO_RECORDS_FOUND'})
				}

				response.status(200).json({data: dataToClient, message: 'SUCCESS_OPERATION'})
			})
			.catch((err)=>{
				response.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
			})
		}
		else{
			response.status(400).json({error: "Missing Paramters", message: 'BAD_REQUEST'})
		}
	},
	//deleting event from personal calendar
	deletePersonalEvent: (request, response) => {
		if(request !== null && request != undefined  && request.user != null && request.user != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0){
			personalCalendar().deletePersonalEvent(db, request.body)
			.then((data)=>{
				if(data.length === 0){
					response.status(200).json({ message: 'NO_RECORDS_FOUND'})
				}
				response.status(200).json({data: request.body.id, message: 'SUCCESS_OPERATION'})
			})
			.catch((err)=>{
				response.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
			})
		}
		else{
			response.status(400).json({error: "Missing Paramters", message: 'BAD_REQUEST'})
		}
	}
}

module.exports = dashboardHandler;
