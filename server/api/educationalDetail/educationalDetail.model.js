let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
let educationDetail= connection.define('educational_detail',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    degree: {
                type: sequelize.STRING,
                allowNull: false
            },
    institute: {
                type: sequelize.STRING,
                allowNull: false
              },
    marks:     {
                type: sequelize.INTEGER,
                allowNull: false
              },
    year_of_passing: {
                      type: sequelize.INTEGER,
                      allowNull: false
                    },
    status:  {
          type: sequelize.BOOLEAN,
          default: true
        }
  },
  {
  classMethods: {
    associate: function(models){
                     models.user_detail.hasMany(models.educational_detail,{
                      foreignKey : 'user_detail_id'
                     });
              }
  }
},
{
  instanceMethods:{}
}
);
  return educationDetail;
};
