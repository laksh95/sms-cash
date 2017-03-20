var controller = require('./parent.controller.js');
var express = require('express');
var router = express.Router();

router.get('/dashboard',controller.addParent)
router.post('/dashboard/addparent',controller.addParent)
/*router.get('/dashboard/calender/add', controller.addHoliday)*/
/*router.post('/register', controller.register);
router.post('/login',controller.login);
router.put('/update',controller.update);
router.delete('/delete',controller.delete);
*/
module.exports = router;