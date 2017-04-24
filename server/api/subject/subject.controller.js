let subject = require('./subject.model')()
let department = require('../department/department.model')()
let sql= require('../../sqldb')
let db=sql()

let subjectFunctions={
  getSubjectAndDepartment: (request, response) => {
    if(request !== null && request !== undefined && request.body !== undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0 || request.user !== null){
      let data = {}
      subject.getSubjectAndDepartment(db, request.body)
      .then((result)=>{
        data.subject = result
        return department.getDepartments(db,request.body)
      })
      .then((result)=>{
        data.department = result.departments

        if(data.department.length === 0){
          response.status(200).json({data, message: 'NO_ROWS_FOUND'})
        }
        if(data.subject.length === 0){
          response.status(200).json({data, message: 'NO_ROWS_FOUND'})
        }
        response.status(200).json({data, message: 'SUCCESS_OPERATION'})
      })
      .catch((err)=>{
        response.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
      })
		}
		else{
			response.status(400).json({error: "Missing Paramters: courseId", message: 'IS_INVALID_INPUT_FORM'})
		}
  }
}

module.exports = subjectFunctions
