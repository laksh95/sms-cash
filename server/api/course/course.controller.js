let model = require('./course.model')()
let sql= require('../../sqldb')

let db=sql()
let courseFunctions = {
    getCourses: (req, res) => {
        model.getCourse(db, function (data) {
            res.send(data)
        })
    },
    addCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                model.addNewCourse(db, req.body, function (data) {
                    res.send(data)
                })
            }
            else {
                res.status(400).end()
            }
        }
        else {
            res.status(400).end()
        }
    },
    editCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                model.editCourse(db, req.body, (data) => {
                    res.send(data)
                })
            }
            else {
                res.status(400).end()
            }
        }
        else {
            res.status(400).end()
        }
    },
    deleteCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                model.deleteCourse(db, req.body.id, (data) => {
                    res.send(data)
                })
            }
            else {
                res.status(400).end()
            }
        }
        else {
            res.status(400).end()
        }
    }
}
module.exports=courseFunctions