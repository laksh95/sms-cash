let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
   return teacher = connection.define('teacher',{
           id: {
               type: sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true
           },
           joining_date: {
               type: sequelize.DATE,
               allowNull:false
           },
           designation: {
               type: sequelize.STRING,
               allowNull: false
           },
           experience_years: {
               type: sequelize.INTEGER,
               allowNull: false
           },
           experience_description: {
               type: sequelize.TEXT
           },
           skill:{
            type: sequelize.ARRAY(sequelize.INTEGER),
            defaultValue:null
          },
           status:{
               type:sequelize.BOOLEAN,
               allowNull:false,
               defaultValue:true
           }
       },
       {
           classMethods: {
               associate: function(models){
                   let teacher = models.teacher
                   let user_detail = models.user_detail
                   let department = models.department
                   user_detail.hasOne(teacher, {foreignKey: 'user_detail_id'});
                   department.hasOne(teacher, {foreignKey: 'department_id'});
               }
           }
       })
}
module.exports = init
