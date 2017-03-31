let model = require('./course.model')()
let sql= require('../../sqldb')

let db=sql()
let courseFunctions = {
   getCourses:(req,res)=>{
       model.getCourse(db,function (data){
           res.send(data)
       })
   },
   addCourse:(req,res)=>{
       model.addNewCourse(db,req.body,function(data){
           res.send(data)
       })
   },
   editCourse:(req,res)=>{
       model.editCourse(db,req.body,(data)=>{
           res.send(data)
       })
   },
   deleteCourse:(req,res)=>{
       model.deleteCourse(db,req.body,(data)=>{
           res.send(data)
       })
   }
}
module.exports=courseFunctions