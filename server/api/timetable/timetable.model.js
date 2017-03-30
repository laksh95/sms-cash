let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
   let timetable = connection.define('timetable',{
     id:{
         type :sequelize.INTEGER ,
         primaryKey : true ,
         autoIncrement : true,
     },
     venue : {
         type:sequelize.TEXT ,
         allowNull : false ,
     },
     day: {
            type: sequelize.ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'),
            allowNull: false
        },
     start_time : {
         type: sequelize.DATE ,
         allowNull : false
     },
     end_time : {
         type: sequelize.DATE ,
         allowNull : false
     },
     venue : {
         type: sequelize.STRING,
     },
     status:{
         type:sequelize.BOOLEAN,
         allowNull:false,
         defaultValue:true
     }
 },
       {
           classMethods : {
               associate : function(models){
                   let section  = models.section
                   let subject = models.subject
                   let teacher = models.teacher
                   let timetable = models.timetable
                   section.hasMany(timetable,{
                       foreignKey : "section_id"
                   })
                   subject.hasMany(timetable,{
                       foreignKey : "subject_id"
                   })
                   teacher.hasMany(timetable,{
                       foreignKey : "teacher_id"
                   })
               }
           }
       }
   );
   return timetable;
}
module.exports = sql;

