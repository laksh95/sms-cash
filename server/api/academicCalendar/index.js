var controller = require('./academicCalendar.controller.js');
var express = require('express');
var router = express.Router();
let checkRole= require('../../config/roleCheck');

//adds holidays from API
router.get('/dashboard',checkRole(['admin']),controller.getAllHolidays)
//fetches data required on loading of a dashboard
router.post('/dashboard/getInitialData', controller.getInitialData)
//adds an event to the academic calendar
router.post('/dashboard/addEvent', checkRole(['admin']), controller.addEvent)
//deletes the event from academic calendar
router.put('/dashboard/deleteEvent', checkRole(['admin']), controller.deleteEvent)

module.exports = router;
