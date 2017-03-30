let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
    return rating = connection.define('rating',{
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
            score: {
                type: sequelize.INTEGER,
                allowNull:false
            },
            type: {
                type: sequelize.ENUM('BAD', 'AVERAGE', 'GOOD', 'VERY GOOD', 'EXCELLENT'),
                allowNull: false
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
