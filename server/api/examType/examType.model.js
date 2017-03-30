/**
 * Created by mustang on 17/03/17.
 */
let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
    return exam_type = connection.define('exam_type',{
            id: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: sequelize.STRING,
                allowNull:false,
                unique:true
            },
            status:{
                type:sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:true
            }
        },
        {
            classMethods: {
            }
        })
}
module.exports = init
