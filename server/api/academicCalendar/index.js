var controller = require('./academicCalendar.controller.js');
var express = require('express');
var router = express.Router();

router.get('/dashboard',controller.getAllHolidys)
router.post('/dashboard/getInitialData', controller.getInitialData)
router.post('/dashboard/addHoliday', controller.addHoliday)

module.exports = router;