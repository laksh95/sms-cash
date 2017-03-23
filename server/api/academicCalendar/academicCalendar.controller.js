var pg = require("pg");
var express = require('express');
var academicCalendar = require('./academicCalendar.model.js');
var parent = require('./../parent/parent.model.js')
var student = require('./../student/student.model.js')
var teacher = require('./../teacher/teacher.model.js')
var personalCalendar = require('./../personalCalendar/personalCalendar.model.js')
var db=require('./../../sqldb')();

var dashboardHandler = {
	getAllHolidys: function(request, response){
		academicCalendar().getAllHolidys(db)
	},
	getInitialData : function(request, response){
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
			return personalCalendar().fetchPersonalCalendarList(db, request.body.userId)
		}).
		then((userPersonalCalendar)=>{
			dataToClient.personalCalendar = userPersonalCalendar
			return academicCalendar().fetchHolidayList(db)
		})
		.then((holidays)=>{
			dataToClient.totalEvent= holidays
			response.send(dataToClient)
		})
	},
	addHoliday: function(request, response){
		let inputData = getData(request, response)
		academicCalendar().addHolidays(db, inputData, (status)=>{
			response.send(status)
		})
	}
}

function getData(request, response){
	let data = {
		type: request.body.type,
    	startDate: new Date(request.body.startDate),
    	endDate: new Date(request.body.endDate),
    	holidayName: request.body.holidayName
	}
	return data;
}

module.exports = dashboardHandler;
