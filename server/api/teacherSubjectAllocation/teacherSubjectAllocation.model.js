let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
 return teacherSubjectAllocation = connection.define('teacher_subject_allocation',{

   status:{
       type:sequelize.BOOLEAN,
       allowNull:false,
       defaultValue:true
   }
 },
 {
   classMethods: {
     associate: function(models){
       let subject = models.subject
       let section = models.section
       let teacher = models.teacher
       let teacherSubjectAllocation = models.teacher_subject_allocation
       subject.hasMany(teacherSubjectAllocation, {foreignKey: 'subject_id', unique: 'teacherSubjectAllocation'})
       teacher.hasMany(teacherSubjectAllocation, {foreignKey: 'teacher_id', unique: 'teacherSubjectAllocation'})
       section.hasMany(teacherSubjectAllocation, {foreignKey: 'section_id', unique: 'teacherSubjectAllocation'})
     }
   }
 })
}

module.exports = init

