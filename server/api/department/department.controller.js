let model = require('./department.model')()
let sql= require('../../sqldb')
let db=sql()
let departmentFunctions={
    addDepartment:function(req,res){
        let name=req.body.name
        let abbreviated_name=req.body.abbreviated_name
        let course_id=req.body.course_id
        let newDept={
            name,
            abbreviated_name,
            course_id
        }
        model.addDepartment(db,newDept,function(data){
            res.send(data)
        })
    },
    editDepartment : function(req,res){
        let name  = req.body.name
        let abbreviated_name = req.body.abbreviated_name
        let id = req.body.id
        let course_id = req.body.course_id

        let curDept = {
            name ,
            abbreviated_name,
            id,
            course_id
        }
        model.editDepartment(db,curDept,function(data){
            res.send(data)
        })

    },
    deleteDepartment : function(req,res){
        // let name  = req.body.name
        // let abbreviated_name = req.body.abbreviated_name
        let id = req.body.id
        // let course_id = req.body.course_id

        model.deleteDepartment(db,id,function(data){
            res.send(data)
        })
    },
    getDepartments : function(req, res){
        if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null){
          model.getDepartments(db,req.body)
          .then((result) => {
            res.send(result.departments);
          })
        }
        else{
          res.status(400).json({error: "Missing Paramters: courseId", message: 'IS_INVALID_INPUT_FORM'})
        }
    }
}
module.exports=departmentFunctions
