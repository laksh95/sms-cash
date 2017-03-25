let sequelize=require('sequelize')
let options = {
   define:{
       underscored:true,
       freezeTableName:true
   }
}
let connection= new sequelize('postgres://postgres:cronj123@192.168.1.223:5432/sms', options)
let data={
   sequelize:sequelize,
   connection:connection
}
module.exports=data
