let data=require('../../config/db')
let sequelize=data.sequelize
let connection=data.connection
let init = function(){
   return section = connection.define('section',{
       id:{
           type:sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       name:{
           type:sequelize.STRING,
           allowNull:false
       }
   },{
       classMethods:{
           associate:function(model){
               let curriculum=model.curriculum
               let section=model.section
               curriculum.hasOne(section,{
                   foreignKey:"curriculum_id"
               })
           }
       }
   })
}
module.exports=init