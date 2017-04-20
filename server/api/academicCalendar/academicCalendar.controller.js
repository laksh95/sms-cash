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
	getAllHolidays: (req, res)=>{
		academicCalendar().getAllHolidys(db, (status)=>{
			res.send(status)
		})
	},
	 //fetching parent count, student count, teacher count, personal events and all academic events
	getInitialData : (req, res)=>{
		console.log("inside controller")
		let dataToClient = {}
		if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null)
		{
			parent().totalParent(db)
			.then((data)=>{
				dataToClient.totalParent = data.count
				if(data.length === 0){
					res.status(200).json({ message: 'NO_RECORDS_FOUND'})
				}
				return student().totalStudent(db)
			})
			.then((totalStudents)=>{
				dataToClient.totalStudents = totalStudents.count
				if(totalStudents.length === 0){
					res.status(200).json({ message: 'NO_RECORDS_FOUND'})
				}
				return teacher().totalTeacher(db)
			})
			.then((totalTeachers)=>{
				dataToClient.totalTeachers = totalTeachers.count
				if(totalTeachers.length === 0){
					res.status(200).json({ message: 'NO_RECORDS_FOUND'})
				}
				return personalCalendar().fetchPersonalCalendarList(db, req.user)
			}).
			then((userPersonalCalendar)=>{
				dataToClient.personalCalendar = userPersonalCalendar
				if(userPersonalCalendar.length === 0){
					res.status(200).json({ message: 'NO_RECORDS_FOUND'})
				}
				return academicCalendar().fetchEventList(db)
			})
			.then((events)=>{
				dataToClient.totalEvent= events
				if(events.length === 0){
					res.status(200).json({events, message: 'NO_RECORDS_FOUND'})
				}
				res.status(200).json({data: dataToClient, message: 'SUCCESS_OPERATION'})
			})
			.catch((err)=>{
        res.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
      })
		}
		else{
			res.status(400).json({error: "Missing Paramters", message: 'BAD_REQUEST'})
		}

	},
	//adding event to academic calendar
	addEvent: (req, res)=>{
		if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0){
			academicCalendar().addEvent(db, req.body)
			.then((data)=>{
				if(data.length === 0){
					res.status(200).json({ message: 'NO_RECORDS_FOUND'})
				}
				else{
					res.status(200).json({data , message: 'SUCCESS_OPERATION'})
				}
			})
			.catch((err)=>{
		        res.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
		      })
		}
		else{
			res.status(400).json({error: "Missing Paramters", message: 'BAD_REQUEST'})
		}

	},
	//deleting event from academic calendar
	deleteEvent: (req, res)=>{
		if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0){
			academicCalendar().deleteEvent(db, req.body)
			.then((data)=>{
				if(data.length === 0){
					res.status(200).json({ message: 'NO_RECORDS_FOUND'})
				}
				else{
					res.status(200).json({data: req.body.id , message: 'SUCCESS_OPERATION'})
				}
			})
			.catch((err)=>{
        res.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
      })
		}
		else{
			res.status(400).json({error: "Missing Paramters", message: 'BAD_REQUEST'})
		}
	}
}

module.exports = dashboardHandler;
