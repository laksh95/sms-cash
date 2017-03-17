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
    no_of_days: {
       type: sequelize.INTEGER,
       allowNull: false
    }
  },
 {
 classMethods : {
    associate : function(models){
    let personalCalendar  = models.personal_calendar
    let userDetail  = models.user_detail
    userDetail.hasMany(personalCalendar,{
      foreignKey : "user_id"
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