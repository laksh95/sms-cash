let database = require('./../../config/db')
let sequelize = database.sequelize
let connection = database.connection

let init = function(){
    return role = connection.define('role',{
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
            access_level: {
                type: sequelize.INTEGER,
                allowNull:false
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

