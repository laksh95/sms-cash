/**
 * Created by mustang on 17/03/17.
 */
let database = require('../../config/db')
let sequelize = database.sequelize
let connection = database.connection
let init = function(){
    return departmentNotice = connection.define('department_notice',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        heading:{
            type:sequelize.STRING,
            allowNull:false
        },
        content:{
            type:sequelize.TEXT,
            allowNull:false
        },
        end_date:{
            type:sequelize.DATE,
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
                let deptNotice=model.department_notice
                dept.hasMany(deptNotice,{
                    foreignKey:'department_id'
                })
            }
        }
    })
}
module.exports=init

