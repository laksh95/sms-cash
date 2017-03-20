var sequelize = require('sequelize');

var options={
   define:{
       freezeTableName:true,
       underscored:true
   }
}


var connection = new sequelize('postgres://postgres:cronj123@192.168.1.223:5432/sms', options);

var connectionObj= {user: 'postgres', 
			database :'student_management_system', 
			password : 'postgres'};

var localConnection = new sequelize(connectionObj.database, connectionObj.user, connectionObj.password, {dialect: 'postgres'}, options);

var data= {
   sequelize:sequelize,
   connection:connection
}

module.exports=data;