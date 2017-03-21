var controller = require('./testdb.controller.js');
var express = require('express');
var router = express.Router();

router.post('/dashboard/addPersonalEvent',controller.addPersonalEvent)
module.exports = router;