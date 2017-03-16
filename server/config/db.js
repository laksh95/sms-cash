// database configuration
let sequelize=require('sequelize')
let option={
    define:{
        underscored:true,
        freezeTableName:true
    }
}
let connection=new sequelize('postgres://postgres:cronj123@192.168.1.224:5432/sms',option)
let  data={
    sequelize:sequelize,
    connection:connection
}
module.exports=data