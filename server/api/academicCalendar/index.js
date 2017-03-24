var controller = require('./academicCalendar.controller.js');
var express = require('express');
var router = express.Router();

router.get('/dashboard',controller.getAllHolidays) //adds holidays from API
router.post('/dashboard/getInitialData', controller.getInitialData) //fetches data required on loading of a dashboard
router.post('/dashboard/addEvent', controller.addEvent) //adds an event to the academic calendar
router.put('/dashboard/deleteEvent', controller.deleteEvent) //deletes the event from academic calendar

module.exports = router;
