/**
 * Created by mustang on 16/03/17.
 */
let database = require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = function () {
    return subject = connection.define('subject',{
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
        skill_set:{
            type:sequelize.ARRAY(sequelize.INTEGER),
            defaultValue:null
        },
        status:{
            type:sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },
    {
        classMethods: {
            associate: function(models){
                let subject = models.subject
                let department = models.department
                department.hasOne(subject, {foreignKey: 'department_id'});
            }
        }
    })
}

module.exports = init
