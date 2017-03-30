let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
let academicYear= connection.define('academic_year',{
   id: {
       type: sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
   name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true
   },
   start_date: {
      type: sequelize.DATE,
      allowNull: false
    },
   end_date: {
      type: sequelize.DATE,
      allowNull: false
    },
    status : {
      type : sequelize.BOOLEAN,
      allowNull: false,
      defaultValue : true
    }
 },
 {
 classMethods: {
 }
},
{
 instanceMethods:{}
}
);
 return academicYear;
};

