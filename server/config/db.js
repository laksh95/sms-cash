let Sequelize =require('sequelize') ;
let config =require('./environment/index');
let lodash=require('lodash');
var connection = new Sequelize(config.sequelize.uri, config.sequelize.options);
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

