let userDetailDb= require('./userDetail.model')();
let models  = require('./../../sqldb')();

exports.getUser= function(req, res){
	let username= req.body.username;
	let password= req.body.password;

	if(username && password){
		userDetailDb.getUserByCredential(models, username,password, function(result){
		res.send(result);
		});
	}
	else{
		console.log("In controller else");
	}
};