let checkRole= require('./../config/roleCheck');
let express=require('express')
let router=express.Router()

module.exports=function(){
	app.use('/department', checkRole(['admin']), require('../api/department'));
    app.use('/course', checkRole(['teacher']), require('../api/course'));
    router.get('/check', function(req,res){
    	console.log("-------------------------------------------------------");
        return res.json({
  			sucess: true,
  			message: 'You are already logged in',
  			token : req.headers.authorization.split(' ')[1],
  			user: req.user
  		});
    });
};
