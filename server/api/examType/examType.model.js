let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
    return examType = connection.define('exam_type',{
            id: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: sequelize.STRING,
                allowNull:false,
                unique:true
            }
        },
        {
            classMethods: {
            }
        })
}

module.exports = init