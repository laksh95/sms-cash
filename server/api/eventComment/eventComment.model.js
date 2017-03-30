let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
  let eventComment= connection.define('event_comment',{
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
            let eventComment = models.event_comment
            let event= models.event
            event.hasMany(eventComment,{
              foreignKey : "event_id"
            })
            userDetail.hasMany(eventComment,{
              foreignKey : "commented_by"
            })
         }
     }
  }
);
 return eventComment;
};

