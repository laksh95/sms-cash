let express = require('express');
let router = express.Router();
let controller = require('./address.controller.js');
router.post('/view',controller.view);
module.exports = router ;