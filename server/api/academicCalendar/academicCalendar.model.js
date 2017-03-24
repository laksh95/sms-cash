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
       type: sequelize.ENUM('EXAM','HOLIDAY','RESULT','OTHERS'),
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
      associate : (models)=>{
        let academicCalendar  = models.academic_calendar
        let academicYear = models.academic_year
        academicYear.hasMany(academicCalendar,{
          foreignKey : "academic_year"
        })
      },
      getAllHolidys : (db, cb)=>{ //loading all holidays from API into the database
        axios.get("https://holidayapi.com/v1/holidays?key=c56f72dd-088b-4eaa-a2be-5448e9426aaf&country=IN&year=2017&month=02").then((data) => {
          data.data.holidays.map((theData, i) => {
            db.academic_calendar.create({
              type: "holiday",
              start_date: new Date(theData.date),
              end_date: new Date(theData.date),
              content: theData.name,
              academic_year: 1
            })
            .then((data)=>{
              cb("Done Create")
            })
          })
        })
        .catch((data) => {
          cb("ERROR IN LOADING DATA TO DATABASE")
        })
      },
      fetchEventList : (db, cb)=>{ //fetching all events from academic calendar
        academicCalendar = db.academic_calendar
        console.log("fetching AC")
        return academicCalendar.findAll({
          attributes: ['id' , 'type' , 'end_date', 'start_date', 'content', 'academic_year']
        ,
        where: {
          status: true
        },
    })
      .then((data) => {
        dataToSend = {
          data,
          status: 1,
          message: "Loaded"
        }
        return dataToSend
      })
      .catch(()=>{
        return {
          status: 0,
          message: "Failed to load data"
        }
      })
      },
      addEvent: (db, inputData, cb)=>{  //adding event to academic calendar
        academicCalendar = db.academic_calendar

        academicCalendar.create({
          type: inputData.type,
          start_date: inputData.startDate,
          end_date: inputData.endDate,
          content: inputData.eventName,
          academic_year: inputData.academicYear
        })
        .then((data)=>{
          cb({
          status: 1,
          message: "Created an entry",
          data: inputData
          })
        })
        .catch((data)=>{
          console.log(data)
          cb({
            status: 0,
            message: "Failed to create an entry",
            data: inputData
          })
        })
      },
      deleteEvent: (db, eventId, cb)=>{ //deleting event from academic calendar
        academicCalendar = db.academic_calendar

        academicCalendar.update({
            status: false
          },{
           where:{
            id:eventId
          }
         })
         .then((data)=>{
           cb({
           status: 1,
           message: "Deleted event",
           data: eventId
         })
        })
        .catch((data)=>{
          cb({
            status: 0,
            message: "Failed to delete entry",
            data: eventId
          })
        })
      },
    }
  }
);
return academicCalendar;
};
