let express=require('express')
let router=express.Router()
let controller=require('./subject.controller')

router.post('/getSubjectAndDepartment',controller.getSubjectAndDepartment)

module.exports=router
