let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
 return teacherSubjectAllocation = connection.define('teacher_subject_allocation',{
 
 },
 {
   classMethods: {
     associate: function(models){
       let subject = models.subject
       let section = models.section
       let teacher = models.teacher
       let teacherSubjectAllocation = models.teacher_subject_allocation
       
       // subject.belongsToMany(teacher,{through:teacherSubjectAllocation,foreignKey: 'subject_id'})
       // teacher.belongsToMany(subject,{through:teacherSubjectAllocation,foreignKey: 'teacher_id'})
       // section.belongsToMany(teacher,{through:teacherSubjectAllocation,foreignKey: 'section_id'})
       // teacher.belongsToMany(section,{through:teacherSubjectAllocation,foreignKey: 'teacher_id'})
       // subject.belongsToMany(section,{through:teacherSubjectAllocation,foreignKey: 'subject_id'})
       // section.belongsToMany(subject,{through:teacherSubjectAllocation,foreignKey: 'section_id'})
       subject.hasOne(teacherSubjectAllocation , { foreignKey: 'subject_id', primaryKey :true });
       teacher.hasOne(teacherSubjectAllocation , { foreignKey: 'teacher_id', primaryKey :true });
       section.hasOne(teacherSubjectAllocation , { foreignKey: 'section_id', primaryKey :true });
       teacherSubjectAllocation.belongsTo(subject, { targetKey: 'id', foreignKey: 'subject_id' });
       teacherSubjectAllocation.belongsTo(teacher, { targetKey: 'id', foreignKey: 'teacher_id' });
       teacherSubjectAllocation.belongsTo(section, { targetKey: 'id', foreignKey: 'section_id' });


     }
   }
 })
}

module.exports = init