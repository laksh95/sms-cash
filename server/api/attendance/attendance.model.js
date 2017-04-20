let data=require('../../config/db')
let sequelize=data.sequelize
let connection=data.connection
let sql = function(){
   return attendance = connection.define('attendance',{
     id:{
       type:sequelize.INTEGER,
       primaryKey:true,
       autoIncrement:true
    },
    total_classes:{
      type:sequelize.INTEGER,
      allowNull:false
    },
    classes_attended:{
      type:sequelize.INTEGER,
      allowNull:false
   },
   status:{
     type:sequelize.BOOLEAN,
     allowNull: false,
     defaultValue: true
   }
 },
   {
     classMethods:{
       associate:function(model){
         let attendance=model.attendance
         let student=model.student
         let section=model.section
         let subject=model.subject
         student.hasMany(attendance,{
           foreignKey:"student_id",
           unique: 'uniqueAttendance'
         })
         section.hasMany(attendance,{
           foreignKey:"section_id",
           unique: 'uniqueAttendance'
         })
         subject.hasMany(attendance,{
           foreignKey:"subject_id",
           unique: 'uniqueAttendance'
        })
      }
    }
 })
}
module.exports=sql
