var controller = require('./personalCalendar.controller.js');
var express = require('express');
var router = express.Router();

router.post('/dashboard/addPersonalEvent',controller.addPersonalEvent)
router.put('/dashboard/deletePersonalEvent',controller.deletePersonalEvent)
module.exports = router;
