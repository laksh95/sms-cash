let path = require('path');
let database = require('../config/db')
let models = ['academicCalendar','academicYear','admin','attendance','batch','club','clubMembers', 'course',
    'curriculum','curriculumSubject','department','departmentNotice','departmentSeat','director',
    'educationalDetail','event','eventComment','eventLike','exam','examType','feedback','grade','hod','parent',
    'personalCalendar','post','postComment','postFollowed','postLike','publicEvent','publicNotice','rating',
    'relativeGrading','resign','result','role','section','skill','student','subject','teacher',
    'teacherSubjectAllocation','timetable','uploadAttendance','uploadResult','userDetail']
let db ={}
let format = path.join(__dirname ,'../api/{0}/{0}.model.js')
for(let index in models){
    let model = require(format.replace(/\{0\}/g,models[index]))()
    db[model.name]=model
}
Object.keys(db).forEach(function(modelName){
    if('associate' in db[modelName]){
        db[modelName].associate(db)
    }
});
database.connection.sync()
let sql = function(){
    return db
}
module.exports  = sql