let model = require('./course.model')()
let sql= require('../../sqldb')
let batch = require('../batch/batch.model')()
let db=sql()
let courseFunctions = {
    /*Called to create a new OTP, store it in database and send it via email.*/
    checkOTP:(req,res)=>{
        if(Object.keys(req).length !== 0 && Object.keys(req.body).length !== 0){
            console.log('----------inside first if condition--------------')
            console.log('---------',!req.headers.authorization,'--------')
            if(!req.headers.authorization){
                res.status(401).end()
            }
            else{
                model.checkOTP(db,req.body,req.headers.authorization)
                    .then((data)=>{
                    console.log(data,'----------data--------')
                        if(data.length !== 0){
                            model.deleteCourse(db,req.body,(response)=>{
                                console.log('----------------',response,'------------------')
                                if(1 === response.status){
                                    res.status(200).json({data:response,msg:'Course deleted successfully.'})
                                }
                                else{
                                    res.status(500).json({data:[],msg:'INTERNAL SERVER ERROR'})
                                }
                            })
                        }
                        else{
                            res.status(200).json({data:[],msg:'NO ROW(s) FOUND'})
                        }
                    })
            }
        }
        else{
            res.status(400).json({data:[],msg:'BAD REQUEST'})
        }
    },
    generateOTP:(req,res)=>{
        if(Object.keys(req).length !== 0){
            console.log('----------inside first if condition--------------')
            console.log('---------',!req.headers.authorization,'--------')
            if(!req.headers.authorizaton === false) {
                console.log('--------second gateway--------',req.headers.authorization)
                res.status(401).end()
            }
            else{
                model.generateOTP(req.headers,db,(data)=>{
                    if(data.status === 1){
                        res.status(200).json(data)
                    }
                    else{
                        res.status(500).json(data)
                    }
                })
            }
        }
        else{
            res.status(400).json({data:[],msg:'BAD REQUEST'})
        }
    },
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
    getCourses: (req, res) => {
        console.log("-------------------",req.body)
        if (Object.keys(req).length !== 0) {
            model.getCourse(db)
                .then((data) => {
                    res.status(200).json({data: data, msg: data.msg})
                })
                .catch((error) => {
                    res.status(500).json({data: [], msg:"Internal Server Error"})
                })
        }
        else {
             res.status(400).json({data:[],msg:"BAD REQUEST"})
        }

    },
    addCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                model.addNewCourse(db, req.body, function (data) {
                    console.log(data)
                    if(1 === data.status){
                        res.status(200).json({data:data.data,msg:data.msg})
                    }
                    else {
                        if(data.msg === "COURSE_ALREADY_EXISTS")
                            res.status(400).json({data:[],msg:data.msg})
                        else
                            res.status(500).json({data:[],msg:data.msg})
                    }
                })
            }
            else {
                res.status(400).json({data:[],msg:data.msg})
            }
        }
        else {
            res.status(400).json({data:[],msg:data.msg})
        }
    },
    editCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                model.editCourse(db, req.body, (data) => {
                    if(1 === data.status)
                        res.status(200).json({data:data.data,msg:data.msg})
                    else
                        res.status(500).json({data:[],msg:"INTERNAL_SERVER_ERROR"})
                })
            }
            else {
                res.status(400).json({data:[],msg:"BAD_REQUEST"})
            }
        }
        else {
            res.status(400).json({data:[],msg:"BAD_REQUEST"})
        }
    },
    deleteCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                model.deleteCourse(db, req.body.id, (data) => {
                    if(1 === data.status)
                        res.status(200).json({data:data.data,msg:data.msg})
                    else
                        res.status(500).json({data:[],msg:"INTERNAL_SERVER_ERROR"})
                })
            }
            else {
                res.status(400).json({data:[],msg:"BAD_REQUEST"})
            }
        }
        else {
            res.status(400).json({data:[],msg:"BAD_REQUEST"})
        }
    }
}
module.exports=courseFunctions
