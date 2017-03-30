let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
let admin= connection.define('admin',{
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
      default: true
    }
  },
  {
  classMethods: {
    associate: function(models){
        models.user_detail.hasMany(models.admin,{
        foreignKey : 'user_detail_id'
      });
    }

  }
},
{
  instanceMethods:{}
}
);
  return admin;
};
