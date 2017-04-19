let database = require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = function () {
    return semester = connection.define('semester',{
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: sequelize.STRING,
            allowNull:false,
        },
        status:{
            type:sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
        name: {
            type: sequelize.INTEGER,
            allowNull:false
        }
    },
    {
        classMethods: {
            associate: function(models){
                var semester = models.semester
                var course = models.course
                course.hasMany(semester, {foreignKey: 'course_id'});
            }
        }
    })
}

module.exports = init