let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = ()=>{
    return otp = connection.define('otp',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        token:{
            type:sequelize.STRING,
            allowNull:false
        },
        otp:{
            type:sequelize.TEXT,
            allowNull:false
        },
        status:{
            type:sequelize.BOOLEAN,
            defaultValue:true
        }
    },{
        classMethods:{
        }
    })
}
module.exports = init