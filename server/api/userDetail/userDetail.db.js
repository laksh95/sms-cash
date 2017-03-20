// var config = require('./../../config');
// var adrsFile=require('./addressModel');
// var sequelize = require('sequelize');
//var seqConn = config.sequelizeConnection;

//let data = require('./../config/db');
let models  = require('./../../sqldb')();

exports.getUserByCredential= function(userName, password, cb){
	console.log("In Db get user by credential");
	//console.log("models: ", models)
	let userDetail= models.user_detail;

	userDetail.findAll({attributes:['id', 'name'], where: {username: userName, password:password}}).then(function(result){
		let user={};
		if(result.length==0){
			user.login=false;
		}
		else{
			user.login=true;
			user.id=result[0].dataValues.id;
			user.name=result[0].dataValues.name;
		}
		cb(user);
	}).catch(function(error){
    console.log(error);
   });
}
