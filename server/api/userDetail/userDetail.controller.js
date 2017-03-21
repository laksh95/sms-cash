// var config = require('./../../config');
// var adrsFile =require('./addressModel');
// var sequelize = require('sequelize');
// var seqConn= config.sequelizeConnection;
// var models=  require('./../').model;


let userDetailDb= require('./userDetail.model')();
let models  = require('./../../sqldb')();

exports.getUser= function(req, res){
	console.log("In controller");
	let username= req.body.username;
	let password= req.body.password;
	console.log("username: ", username);
	console.log("password: ", password);

	if(username && password){
		console.log("In controller if");
		userDetailDb.getUserByCredential(models, username,password, function(result){
		console.log("In controller Callback");
		res.send(result);
		});
	}
	else{
		console.log("In controller else");
	}
	// else{
	// 	model.getAddress(function(addressArray){
	// 		console.log("In controller Callback");
	// 		res.send(addressArray);
	// 	});
	// }
};