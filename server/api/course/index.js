let express=require('express')
let router=express.Router()
let controller = require('./course.controller');
router.get('/getInitialData',controller.getInitialData) // gets all batches, departments, courses at once
router.get('/getCourses',controller.getCourses)
router.post('/addCourse',controller.addCourse)
router.get('/generateOTP',controller.generateOTP)
router.put('/editCourse',controller.editCourse)
router.put('/deleteCourse',controller.checkOTP)
module.exports = router