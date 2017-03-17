let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function() {
   return department = connection.define('department',{
       id:{
           type:sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       name:{
           type:sequelize.STRING,
           allowNull:false,
           unique:true
       },
       abbreviated_name:{
           type:sequelize.STRING,
           allowNull:false,
           unique:true
       },
       status:{
           type:sequelize.BOOLEAN,
           allowNull:false
       }
   },{
       classMethods:{
           associate:function(model){
               let course=model.course
               let dept=model.department
               course.hasOne(dept,{
                   foreignKey:'course_id'
               })
           }
       }
   })
}
module.exports=init