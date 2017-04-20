let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
let notice= connection.define('public_notice',{
   id: {
       type: sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
   heading: {
       type: sequelize.STRING,
       allowNull: false,
       unique: true
     },
   content: {
       type: sequelize.TEXT,
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
 classMethods: {
 }
},
{
 instanceMethods:{}
}
);
 return notice;
};

