/**
 * Created by mustang on 18/03/17.
 */
let model = require('./course.model')
let sql= require('../../sqldb')

let db=sql()
let courseFunctions = {
    getCourses:(req,res)=>{
        model().getCourse(db,function (data){
            console.log('controller',data)
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
        model().addNewCourse(db,setCourseData,function(data){
            console.log('controller')
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
        model().editCourse(db,updateDetails,(data)=>{
            res.send(data)
        })


    },
    deleteCourse:(req,res)=>{
        let id=req.body.id
        model().deleteCourse(db,id,(data)=>{
            res.send(data)
        })

    }

}
module.exports=courseFunctions
