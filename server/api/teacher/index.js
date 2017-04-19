let express=require('express')
let router=express.Router()
let controller=require('./teacher.controller')

router.post('/getTeacherAndFeedback',controller.getTeacherAndFeedback)

module.exports=router
