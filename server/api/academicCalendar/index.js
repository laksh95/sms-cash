var controller = require('./academicCalendar.controller.js');
var express = require('express');
var router = express.Router();

router.get('/dashboard',controller.getAllHolidys)
router.get('/dashboard/getInitialData', controller.getInitialData)
router.post('/dashboard/addHoliday', controller.addHoliday)
/*router.get('/dashboard/calender/add', controller.addHoliday)*/
/*router.post('/register', controller.register);
router.post('/login',controller.login);
router.put('/update',controller.update);
router.delete('/delete',controller.delete);
*/
module.exports = router;