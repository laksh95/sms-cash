var pg = require("pg");
var express = require('express');
var academicCalendar = require('./academicCalendar.model.js');
var parent = require('./../parent/parent.model.js')
var student = require('./../student/student.model.js')
var teacher = require('./../teacher/teacher.model.js')
var personalCalendar = require('./../personalCalendar/personalCalendar.model.js')
var db=require('./../../sqldb')();

var dashboardHandler = {
	getAllHolidays: (request, response)=>{ //loading all holidays from API into the database
		academicCalendar().getAllHolidys(db, (status)=>{
			response.send(status)
		})
	},
	getInitialData : (request, response)=>{ //fetching parent count, student count, teacher count, personal events and all academic events
		let dataToClient = {}
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
			return personalCalendar().fetchPersonalCalendarList(db, request.body.id)
		}).
		then((userPersonalCalendar)=>{
			dataToClient.personalCalendar = userPersonalCalendar
			return academicCalendar().fetchEventList(db)
		})
		.then((events)=>{
			dataToClient.totalEvent= events
			response.send(dataToClient)
		})
	},
	addEvent: (request, response)=>{  //adding event to academic calendar
		let inputData = getData(request, response)
		academicCalendar().addEvent(db, inputData, (status)=>{
			response.send(status)
		})
	},
	deleteEvent: (request, response)=>{ //deleting event from academic calendar
		console.log("inside deleteEvent")
		let inputData = request.body.id
		academicCalendar().deleteEvent(db, inputData, (status)=>{
			response.send(status)
		})
	}
}

function getData(request, response){ //getting data from frontend via post, put
	let data = {
		type: request.body.type,
    startDate: new Date(request.body.startDate),
    endDate: new Date(request.body.endDate),
    eventName: request.body.eventName,
		academicYear: request.body.academicYear
	}
	return data;
}

module.exports = dashboardHandler;
