let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function(){
   return course=connection.define('course',{
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
       duration:{
           type:sequelize.FLOAT,
           allowNull:false
       },
       status:{
           type:sequelize.BOOLEAN,
           allowNull:false
       }
   },
   {
       classMethods:{
           associate:function(model){

           },
           getCourse:function(db,cb){
               db.course.findAll({
                   attributes:['id','name']
               }).then(function(data){
                   let courseData=data[0].dataValues
                   cb(courseData)
               })
           }
       }
   })
}
module.exports=init