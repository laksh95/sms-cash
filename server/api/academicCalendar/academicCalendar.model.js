let data = require('./../../config/db');
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
       type: sequelize.ENUM('exam','holiday','result','others'),
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
      },
      getAllHolidys : function(db){
        axios.get("https://holidayapi.com/v1/holidays?key=c56f72dd-088b-4eaa-a2be-5448e9426aaf&country=IN&year=2017&month=01").then((data) => {
          data.data.holidays.map((theData, i) => {
            db.academic_calendar.create({
              type: "holiday",
              start_date: new Date(theData.date),
              end_date: new Date(theData.date),
              content: theData.name
            })
            .then((data)=>{
              console.log("DONE CREATE")
            })
          })
        })
        .catch((data) => {
          console.log("ERROR IN LOADING DATA TO DATABASE")
        })
      },
      fetchHolidayList : function(db, cb){
        academicCalendar = db.academic_calendar

        return academicCalendar.findAll({

          attributes: ['type', 'end_date', 'start_date', 'content'] 
          
        }).then((data) => {
          return data
        })
      },
      addHolidays: function(db, inputData, cb){
        academicCalendar = db.academic_calendar

        academicCalendar.create({
          type: inputData.type,
          start_date: inputData.startDate,
          end_date: inputData.endDate,
          content: inputData.holidayName
        })
        .then((data)=>{
          console.log("DONE CREATE")
          cb({
          status: 1,
          message: "Created an entry"
          }) 
        })
        .catch((data)=>{
          cb({
            status: 0,
            message: "Failed to create an entry"
          })
        })
      }
    }
  }
);
return academicCalendar;
};