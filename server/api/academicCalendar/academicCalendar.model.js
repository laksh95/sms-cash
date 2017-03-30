let data = require('./../../config/db');
let validator = require('validator')
let sequelize = data.sequelize;
let connection = data.connection;
let axios = require('axios')


module.exports=function(){
let academicCalendar= connection.define('academic_calendar',{
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: sequelize.ENUM('EXAM','HOLIDAY','RESULT','OTHERS'),
            allowNull: false,
            validate: {
                isIn: [['EXAM','HOLIDAY','RESULT','OTHERS']],
                notEmpty: true
            }
        },
        start_date: {
            type: sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                notEmpty: true
            }
        },
        end_date: {
            type: sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                notEmpty: true
            }
        },
        content: {
            type: sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                isBoolean: true
            },
        }
    },
    {
     classMethods : {
        associate : function(models){
        let academicCalendar  = models.academic_calendar
        let academicYear = models.academic_year
        academicYear.hasMany(academicCalendar,{
          foreignKey : "academic_year"
        })
        }
        }
        },
        {
         instanceMethods:{}
        }
        );
     return academicCalendar;
    };