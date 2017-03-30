let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
  return eventLike= connection.define('event_like',{
      id: {
         type: sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
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
            let userDetail  = models.user_detail
            let eventLike = models.event_like
            let event= models.event
            event.hasMany(eventLike,{
              foreignKey : "event_id"
            })
            userDetail.hasMany(eventLike,{
              foreignKey : "liked_by"
            })
         }
     }
  }
);

};

