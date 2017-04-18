let teacher = require('./teacher.model')()
let feedback = require('../feedback/feedback.model')()
let sql= require('../../sqldb')
let db=sql()

let teacherFunctions={
  getTeacherAndFeedback: (request, response) => {
    if(request !== null && request != undefined && request.body != undefined && Object.keys(request).length!==0 && Object.keys(request.body).length!==0 || request.user != null){
      teacher.getTeacherAndFeedback(db, request.body)
      .then((result)=>{
          if(result.length == 0){
            response.send(200).json({message: 'NO_ROWS_FOUND'})
          }
          else{
            let data= [];
            result.map((item, indexItem)=>{
              let score = 0
              let totalRatings = 0
              let type = ""
              totalRatings = item.feedbacks.length
              for(let index=0 ;index<item.feedbacks.length; index ++){
                score = item.feedbacks[index].rating.score + score
              }
              score = (score/totalRatings)
              type = getRatingAsPerAverageMarks(score)
              let final = {
                finalScore: score,
                subject_id: item.feedbacks[indexItem].subject_id,
                type: type,
                subjectName: item.feedbacks[indexItem].subject.name
              }
              item.dataValues.averageFeedback = final
              data.push(item)
            })
            response.status(200).json({data, message: 'SUCCESS_OPERATION'})
          }
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

function getRatingAsPerAverageMarks(score){
  switch (true) {
    case (0<score && score<=20):
      return "BAD"
    case (20<score && score<=40):
      return "AVERAGE"
    case (40<score && score<=60):
      return "GOOD"
    case (60<score && score<=80):
      return "VERY GOOD"
    case (60<score && score<=80):
      return "VERY GOOD"
    case (80<score && score<=100):
      return "EXCELLENT"
    default:
      return "INVALID SCORE"
  }
}

module.exports = teacherFunctions
