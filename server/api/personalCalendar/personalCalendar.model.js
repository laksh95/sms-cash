let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;
let validator = require('validator')

module.exports=function(){
let personalCalendar= connection.define('personal_calendar',{
   id: {
       type: sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
   heading: {
        type: sequelize.TEXT,
       allowNull: false,
       validate: {
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
    associate : (models) => {
      let personalCalendar  = models.personal_calendar
      let userDetail  = models.user_detail
      userDetail.hasMany(personalCalendar,{
        foreignKey : "user_id"
      })
    },
    fetchPersonalCalendarList: (db, request) => { //fetching all personalCalendar details for a particular user
      personalCalendar = db.personal_calendar

      return personalCalendar.findAll({
        attributes: ['id' ,'heading', 'end_date', 'start_date', 'content'],
        where: {
          user_id: request.id,
          status: true
        }
      })
    },
    addPersonalEvent: (db, request) => { //adding event from personal calendar for a prticular user
      personalCalendar = db.personal_calendar

    return personalCalendar.create({
        heading: request.body.heading,
        end_date: request.body.endDate,
        start_date: request.body.startDate,
        content: request.body.content,
        user_id: request.user.id
      })
    },
    deletePersonalEvent: (db, request) => { ////deleting event from personal calendar for a particular user
      personalCalendar = db.personal_calendar

      return personalCalendar.update({
            status: false
            },{
             where:{
              id:request.id
            }
         })
    }
  }
},
{
 instanceMethods:{}
}
);
 return personalCalendar;
};
