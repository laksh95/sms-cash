let feedback = require('./feedback.model')()
let sql= require('../../sqldb')
let db=sql()

let feedbackFunctions={
  getFeedback: (request, response) => {
    if(request !== null && request != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0 || request.user != null){
			feedback.getFeedback(db, request.body)
      .then((data)=>{
        response.status(200).json({data, message: 'SUCCESS_OPERATION'})
      })
      .catch((data)=>{
        response.status(500).json({error: data.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
      })
		}
		else{
			response.status(400).json({error: "Missing Paramters: courseId", message: 'IS_INVALID_INPUT_FORM'})
		}
  }
}

module.exports = feedbackFunctions
