let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

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
     },
    content: {
       type: sequelize.TEXT,
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
    status: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    fetchPersonalCalendarList: (db, userId) => { //fetching all personalCalendar details for a particular user
      personalCalendar = db.personal_calendar

      return personalCalendar.findAll({
        attributes: ['id' ,'heading', 'end_date', 'start_date', 'content'],
        where: {
          user_id: userId,
          status: true
        }
      })
      .then((data) => {
        dataToSend = {
          data,
          status: 1,
          message: "Loaded"
        }
        return dataToSend
      })
    },
    addPersonalEvent: (db, inputData, cb) => { //adding event from personal calendar for a prticular user
      personalCalendar = db.personal_calendar

    return personalCalendar.create({
        heading: inputData.heading,
        end_date: inputData.endDate,
        start_date: inputData.startDate,
        content: inputData.content,
        user_id: inputData.userId
      })
      .then((data)=>{
        cb({
          status: 1,
          message: "Created an entry",
          data: {
            heading: data.heading,
            end_date: data.end_date,
            start_date: data.start_date,
            content: data.content,
            id: data.id
          }
        })
      })
      .catch((data)=>{
        cb({
          status: 0,
          message: "Failed to create an entry"
        })
      })
    },
    deletePersonalEvent: (db, inputData, cb) => { ////deleting event from personal calendar for a particular user
      personalCalendar = db.personal_calendar

      personalCalendar.update({
            status: false
          },{
           where:{
            id:inputData
          }
         })
         .then((data)=>{
           cb({
           status: 1,
           message: "Deleted event",
           data: inputData
         })
        })
        .catch((data)=>{
          cb({
            status: 0,
            message: "Failed to delete entry",
            data: inputData
          })
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