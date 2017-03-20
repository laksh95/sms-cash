/**
 * Created by mustang on 18/03/17.
 */
let express=require('express')
let router=express.Router()
let controller = require('./course.controller')
router.get('/getCourses',controller.getCourses)
router.post('/addCourse',controller.addCourse)
router.put('/editCourse',controller.editCourse)
router.delete('/deleteCourse',controller.deleteCourse)
module.exports = router