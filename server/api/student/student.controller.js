let model = require('./student.model')()
let sql= require('../../sqldb')
let db=sql()
let studentFunctions={
    getInitialData: function(request, response){
        //let courseId = checkRequestParameters(request, response).courseId;
        console.log(request.body)
        let courseId= request.body.courseId;
        console.log("Course in controller: ", courseId);
        model.getInitialData(db, courseId, (data)=>{
            // departments=data;
            response.status(data.status).json({
                data:data.data,
                message:data.msg,
            })
        })
    },
    getStudents:function(request, response){
        let include;
        let limit=((request.body.pageNo-1)*request.body.recordsPerPage)-1;
        let offset=request.body.recordsPerPage;
        if(request.body.semester !== undefined && request.body.semester !== null){
            include=[{
                model:db.curriculum,
                include:[{
                    model:db.semester,
                    where:{
                        name:request.body.semester,
                    }
                }],
                where:{
                    status:'t'
                }
            }]
        }
        else {
            include=undefined
        }
        let whereAttribute={
            where:{
                batch_id:request.body.batchId || undefined,
                department_id:request.body.departmentId || undefined
            },
            include:include
        }
        model.getStudents(db,limit,offset,whereAttribute,(data)=>{
            response.status(data.status).json({
                data:data.data,
                message:data.msg
            })
        })
    },
    getStudentDetails:function(request,response){
        let sendData = checkRequestParameters(request, response)
        model.getStudentDetails(db, sendData, (data)=>{
            response.status(data.status).json({
                data:data.data,
                message:data.msg,
            })
        })
    }
}

function checkRequestParameters(request, response){
    if(request.body=== null||request.body === undefined){
        response.status(400).send({
            message:'Bad Request'
        })
    }
    else  return request.body
}
function getWhereClause(request, response){

}
module.exports=studentFunctions