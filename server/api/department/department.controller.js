let model = require('./department.model')()
let sql= require('../../sqldb')
let db=sql()
let departmentFunctions={
    addDepartment:function(req,res){
        console.log("In controller Add department");
        if(req.body){
            let name=req.body.name
            let abbreviated_name=req.body.abbreviated_name
            let course_id=req.body.course_id
            let newDept={
                name,
                abbreviated_name,
                course_id
            }
            model.addDepartment(db,newDept,function(data){
                //res.status(200).send(data)
                console.log("data: ", data);
                if(data.status==1){
                    console.log("REspons: ", {data: data.data, message:'SUCCESS_OPERATION'});
                    res.status(200).json({data: data.data, message:'SUCCESS_OPERATION'})
                }
                else if(data.msg=='NO_ROWS_FOUND')
                    res.status(400).json({data: "Course doesnot exists", message:'IS_INVALID_INPUT_FORM'})
                else if(data.msg=='IS_ALREADY_EXISTS')
                    res.status(400).json({data: "Department Already exists", message:'IS_ALREADY_EXISTS'})
                else if(data.msg=='IS_INTERNAL_SERVER_ERROR')
                    res.status(500).json({data: data.err.toString(), message:'IS_INTERNAL_SERVER_ERROR'})
                else
                    res.status(500).json({data: "Something went wrong", message:'IS_INTERNAL_SERVER_ERROR'})
            })
        }
        else
            res.status(400).json({data: "Missing Paramters", message:'IS_INVALID_INPUT_FORM'});  
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
            console.log("blahhhhhh-------------------------",result)
            res.send(result.departments);
          })
        }
        else{
          res.status(400).json({error: "Missing Paramters: courseId", message: 'IS_INVALID_INPUT_FORM'})
        }
    }
}
module.exports=departmentFunctions
