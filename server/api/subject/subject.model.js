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
        status: {
            type: sequelize.BOOLEAN,
            allowNull:false
        }
    },
    {
        classMethods: {
            associate: function(models){
                var subject = models.subject
                var skill = models.skill
                skill.hasMany(subject, {foreignKey: 'skills_set'});

                let department = models.department
                department.hasOne(subject, {foreignKey: 'department_id'});
            }
        }
    })
}

module.exports = init
