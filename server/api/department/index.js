let express=require('express')
let router=express.Router()
let controller=require('./department.controller')
router.post('/addDepartment',controller.addDepartment);
module.exports=router