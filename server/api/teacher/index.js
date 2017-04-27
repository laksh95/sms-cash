let express=require('express')
let router=express.Router()
let controller=require('./teacher.controller')

router.post('/getTeacherAndFeedback',controller.getTeacherAndFeedback)
router.post('/fetchTeacherByCourseId',controller.fetchTeacherByCourseId)
router.put('/approveDetails',controller.approveDetails)
router.put('/deleteTeacher',controller.deleteTeacher)
router.put('/changeDetails',controller.changeDetails)
router.post('/addTeacher',controller.addTeacher)
module.exports=router
