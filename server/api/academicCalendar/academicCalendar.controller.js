var pg = require("pg");
var express = require('express');
var academicCalendar = require('./academicCalendar.model.js');
var parent = require('./../parent/parent.model.js')
var student = require('./../student/student.model.js')
var teacher = require('./../teacher/teacher.model.js')
var personalCalendar = require('./../personalCalendar/personalCalendar.model.js')
var db=require('./../../sqldb')();

var dashboardHandler = {
	//loading all holidays from API into the database
	getAllHolidays: (request, response)=>{
		academicCalendar().getAllHolidys(db, (status)=>{
			response.send(status)
		})
	},
	 //fetching parent count, student count, teacher count, personal events and all academic events
	getInitialData : (request, response)=>{
		console.log("inside controller")
		let dataToClient = {}
		if(request !== null && request != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0 || request.user != null)
		{
			parent().totalParent(db)
			.then((data)=>{
				dataToClient.totalParent = data
				return student().totalStudent(db)
			})
			.then((totalStudents)=>{
				dataToClient.totalStudents = totalStudents
				return teacher().totalTeacher(db)
			})
			.then((totalTeachers)=>{
				dataToClient.totalTeachers = totalTeachers
				return personalCalendar().fetchPersonalCalendarList(db, request.user)
			}).
			then((userPersonalCalendar)=>{
				dataToClient.personalCalendar = userPersonalCalendar
				return academicCalendar().fetchEventList(db)
			})
			.then((events)=>{
				dataToClient.totalEvent= events
				response.send(dataToClient)
			})
		}
		else{
			response.status(400).end()
		}

	},
	//adding event to academic calendar
	addEvent: (request, response)=>{
		if(request !== null && request != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0){
			academicCalendar().addEvent(db, request.body, (status)=>{
				response.send(status)
			})
		}
		else{
			response.status(400).end()
		}

	},
	//deleting event from academic calendar
	deleteEvent: (request, response)=>{
		console.log("inside controller")
		if(request !== null && request != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0){
			academicCalendar().deleteEvent(db, request.body, (status)=>{
				response.send(status)
			})
		}
		else{
			response.status(400).end()
		}
	}
}

module.exports = dashboardHandler;
