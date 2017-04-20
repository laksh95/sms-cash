let express=require('express')
let router=express.Router()
let controller=require('./department.controller')
router.post('/addDepartment',controller.addDepartment)
router.put('/editDepartment',controller.editDepartment)
router.put('/deleteDepartment',controller.deleteDepartment)
router.post('/getDepartments',controller.getDepartments)
module.exports=router