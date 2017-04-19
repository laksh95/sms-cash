let sequelize=require('sequelize')
let options = {
   define:{
       underscored:true,
       freezeTableName:true
   }
}
let connection= new sequelize('postgres://postgres:shilpa@localhost:5432/sms', options)
let data={
   sequelize:sequelize,
   connection:connection
}
module.exports=data
