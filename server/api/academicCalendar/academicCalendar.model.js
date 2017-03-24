let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

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