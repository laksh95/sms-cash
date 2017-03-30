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
    status:{
        type:sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
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
