var controller = require('./testdb.controller.js');
var express = require('express');
var router = express.Router();

router.get('/dashboard',controller.getAllHolidys)
/*router.post('/register', controller.register);
router.post('/login',controller.login);
router.put('/update',controller.update);
router.delete('/delete',controller.delete);
*/
module.exports = router;