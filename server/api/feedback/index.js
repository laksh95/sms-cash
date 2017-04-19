let express=require('express')
let router=express.Router()
let controller=require('./feedback.controller')

router.post('/getfeedback',controller.getFeedback)

module.exports=router
