let model = require('./department.model')
let sql= require('../../sqldb')
let db=sql()
let departmentFunctions={
   addDepartment:function(req,res){
    let name=req.body.name
    let abbreviated_name=req.body.abbreviated_name
    let course_name=req.body.course_name
    let newDept={
       name,
       abbreviated_name,
       course_name
    }
    model().addDepartment(db,newDept,function(data){
       res.send(data)
    })
   }
}
module.exports=departmentFunctions