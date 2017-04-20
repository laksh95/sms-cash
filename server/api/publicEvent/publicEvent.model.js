let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let publicEvent = connection.define('public_event',{
      status:{
          type:sequelize.BOOLEAN,
          allowNull:false,
          defaultValue:true
      }
    },
    {
      classMethods : {
        associate : function(models){
          let event  = models.event
          event.hasMany(publicEvent,{
            foreignKey : 'event_id'
          })
        }
      }
    });
  return publicEvent;
}
module.exports = sql;
