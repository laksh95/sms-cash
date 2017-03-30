let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function(){
   return departmentSeats=connection.define('department_seat',{
       id:{
           type:sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       batch:{
           type:sequelize.INTEGER,
           allowNull:false
       },
       total_seats:{
           type:sequelize.INTEGER,
           allowNull:false
       },
       status:{
           type:sequelize.BOOLEAN,
           allowNull:false,
           defaultValue:true
       }
   },{
       classMethods:{
           associate:function(model){

               let dept=model.department
               let seats=model.department_seat
               dept.hasMany(seats,{
                   foreignKey:'department_seats_id'
               })
           }
       }
   })
}
module.exports=init