let express=require('express')
let router=express.Router()
let controller = require('./course.controller');
router.get('/getCourses',controller.getCourses) 
router.post('/addCourse',controller.addCourse)
router.put('/editCourse',controller.editCourse)
router.put('/deleteCourse',controller.deleteCourse)
module.exports = router