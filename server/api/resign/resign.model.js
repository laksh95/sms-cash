/**
 * Created by mustang on 17/03/17.
 */
let database = require('../../config/db')
let sequelize=database.sequelize
let connection = database.connection
let init = function(){
    return resign = connection.define('resign',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
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
                let teacher = model.teacher
                let resign = model.resign
                teacher.hasMany(resign, {
                    foreignKey:'teacher_id'
                })
            }
        }
    })
}
module.exports = init
