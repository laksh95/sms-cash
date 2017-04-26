let teacher = require('./teacher.model')()
let feedback = require('../feedback/feedback.model')()
let sql= require('../../sqldb')
let db=sql()

let teacherFunctions={
  fetchTeacherByCourseId: (req, res) => {
      if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null){
        teacher.fetchTeacherByCourseId(db, req.body)
        .then((result)=>{
          if(result.length == 0){
            res.status(200).json({message: 'NO_ROWS_FOUND'})
          }
          else{
            res.status(200).json({result, message: 'SUCCESS_OPERATION'})
          }
        })
        .catch((err)=>{
          res.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
        })
      }
      else{
  			res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'})
  		}
  },
  deleteTeacher: (req, res) => {
    if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null){
      teacher.deleteTeacher(db, req.body)
      .then((result)=>{
          res.status(200).json({teacher: req.body.teacherId, message: 'SUCCESS_OPERATION'})
      })
      .catch((err)=>{
        res.status(500).json({error: err.toString(), teacher: req.body.teacherId, message: 'IS_INTERNAL_SERVER_ERROR'})
      })
    }
    else{
      res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'})
    }
  },
  approveDetails: (req, res) => {
    if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null){
      teacher.approveDetails(db, req.body)
      .then((result)=>{
          res.status(200).json({teacher: req.body.teacherId, message: 'SUCCESS_OPERATION'})
      })
      .catch((err)=>{
        res.status(500).json({error: err.toString(), teacher: req.body.teacherId, message: 'IS_INTERNAL_SERVER_ERROR'})
      })
    }
    else{
      res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'})
    }
  },
  changeDetails: (req, res) => {
    if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null){
      teacher.changeDetails(db, req.body)
      .then((result)=>{

          res.status(200).json({result: req.body, result: result, message: 'SUCCESS_OPERATION'})
      })
      .catch((err)=>{

        res.status(500).json({error: err.toString(), teacher: req.body.teacherId, message: 'IS_INTERNAL_SERVER_ERROR'})
      })
    }
    else{
      res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'})
    }
  },
  addTeacher:(req , res)=>{
     if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null){
      teacher.addTeacher(db, req.body)
      .then((result)=>{
        console.log("Success");
          res.status(200).json({result: req.body, result: result, message: 'SUCCESS_OPERATION'})
      })
      .catch((err)=>{
         console.log("Invalid");
        res.status(500).json({error: err.toString(), teacher: req.body, message: 'IS_INTERNAL_SERVER_ERROR'})
      })
    }
    else{
         console.log("Invalid");
      res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'})
    }
  },
  getTeacherAndFeedback: (req, res) => {
    if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null){
      teacher.getTeacherAndFeedback(db, req.body)
      .then((result)=>{
          if(result.length == 0){
            res.status(200).json({message: 'NO_ROWS_FOUND'})
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
            res.status(200).json({data, message: 'SUCCESS_OPERATION'})
          }
        })
      .catch((err)=>{
        res.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
      })
		}
		else{
			res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'})
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
