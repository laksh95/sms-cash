let model = require('./course.model')()
let sql= require('../../sqldb')
let batch = require('../batch/batch.model')()
let db=sql()
let courseFunctions = {
    getInitialData: (req,res) => {
      let dataToClient = {}
      if(req.body !== null){
        model.getCourse(db)
        .then((allCourse)=>{
          dataToClient.course = allCourse
          return batch.getBatch(db)
        })
        .then((allBatch)=>{
          dataToClient.batch = allBatch
          res.send(dataToClient)
        }).
        catch((data)=>{
          res.status(500).end()
        })
      }
      else{
        res.status(400).end()
      }
    },
   getCourses:(req,res)=>{
       model.getCourse(db)
       .then((data)=>{
         res.send(data)
       })
   },
   addCourse:(req,res)=>{
       let course_name=req.body.courseName
       let duration=req.body.duration

       let setCourseData={
           course_name,
           duration
       }
       model.addNewCourse(db,setCourseData,(data)=>{
           res.send(data)
       })
   },
   editCourse:(req,res)=>{
       let name=req.body.name
       let duration=req.body.duration
       let id=req.body.id
       let updateDetails={
           name,
           duration,
           id
       }
       model.editCourse(db,updateDetails,(data)=>{
           res.send(data)
       })
   },
   deleteCourse:(req,res)=>{
       let id=req.body.id
       model.deleteCourse(db,id,(data)=>{
           res.send(data)
       })
   }
}
module.exports=courseFunctions
