let express=require('express')
let router=express.Router()
let controller=require('./student.controller')
router.post('/addBulk',controller.addBulk)
module.exports=router