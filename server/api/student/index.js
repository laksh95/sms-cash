let controller = require('./student.controller.js');
let express = require('express');
let router = express.Router();

router.post('/getInitialData',controller.getInitialData)
router.post('/getStudents',controller.getStudents)
router.post('/getStudentDetails',controller.getStudentDetails)
router.post('/addOneStudent',controller.addOneStudent)
router.put('/editStudentDetails',controller.editStudentDetails)
router.put('/deleteStudentDetails',controller.deleteStudentDetails)
module.exports = router;
