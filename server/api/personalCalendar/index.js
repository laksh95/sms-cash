var controller = require('./personalCalendar.controller.js');
var express = require('express');
var router = express.Router();

router.post('/dashboard/addPersonalEvent',controller.addPersonalEvent) //adding event from personal calendar
router.put('/dashboard/deletePersonalEvent',controller.deletePersonalEvent) //deleting event from personal calendar
module.exports = router;
