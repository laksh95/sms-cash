let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;
let axios = require('axios')
let validator = require('validator')

module.exports=function(){
    let academicCalendar= connection.define('academic_calendar',{
            id: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: sequelize.ENUM('EXAM','HOLIDAY','RESULT','SEMESTER','OTHERS'),
                allowNull: false
            },
            start_date: {
                type: sequelize.DATE,
                allowNull: false
            },
            end_date: {
                type: sequelize.DATE,
                allowNull: false
            },
            content: {
                type: sequelize.TEXT,
                allowNull: false
            },
            status: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            classMethods : {
                associate : (models)=>{
                    let academicCalendar  = models.academic_calendar
                    let academicYear = models.academic_year
                    let course = models.course
                    academicYear.hasMany(academicCalendar,{
                        foreignKey : "academic_year_id"
                    });
                    course.hasMany(academicCalendar, {
                        foreignKey : "course_id"
                    });

                },
            }
        }
    );
    return academicCalendar;
};