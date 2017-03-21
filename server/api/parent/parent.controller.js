var pg = require("pg");
var express = require('express');
var sequalizeObject = require('./parent.model.js');
var db=require('./../../sqldb')();

var dashboardHandler = {
	addParent: function(request, response){
		inputData = getData(request, response)
		sequalizeObject().addParentDetail(db, inputData, (status)=>{
			response.send(status)
		} )
	},
	fetchParentCount: function(request, response){
		sequalizeObject().fetchHolidayList(db, function(data){
			response.send(data)
		})
	}
}

function getData(request, response){
	let motherName = request.body.motherName
	let fatherName = request.body.fatherName
	let email = request.body.email
	let contactNumber = request.body.contactNumber
	let countryCode = request.body.countryCode

	let data = {
		mother_name: motherName,
		father_name: fatherName,
		email_id: email,
		contact_number: contactNumber,
		country_code: countryCode
	}
	
	return data;
}


module.exports = dashboardHandler;