let Sequelize =require('sequelize') ;
let config =require('./environment');
let lodash=require('lodash');
let connection = new Sequelize(config.sequelize.uri, config.sequelize.options);
let options = {
   define:{
       underscored:true,
       freezeTableName:true
   }
}
let data={
   sequelize:Sequelize,
   connection:connection
}
module.exports=data
