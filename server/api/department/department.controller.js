let model = require('./department.model')
let sql= require('../../sqldb')
let db=sql()
let departmentFunctions={
   addDepartment:function(req,res){
    // if(req.body.id) {
    //   delete req.body.id
    // }
    // model().addDepartment(db,req.body,function(data){
    //        res.send(data)
    //    })
   
    // newDept.name = req.body.name;

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