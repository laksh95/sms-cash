var controller = require('./parent.controller.js');
var express = require('express');
var router = express.Router();

router.post('/dashboard/addparent',controller.addParent) //adding parent

module.exports = router;
