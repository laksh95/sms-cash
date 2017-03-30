let checkRole= require('./../config/roleCheck');

let path= require('path');

module.exports=function(app){
	const authRoutes = require('./authRoute');
	// const apiRoutes = require('./apiRoute');
	app.use('/auth', authRoutes);
     

	//app.use('/api',require('./apiRoute')(app));
	app.use('/api/department',checkRole(['admin']), require('../api/department'));
  app.use('/api/course',checkRole(['teacher']), require('../api/course'));
  app.get('/api/check', (req, res) => {
    console.log(req.headers);
    let user ={};
    user.name= req.user.name;
    user.role= req.user.role;
    user.username= req.user.username;
    return res.json({
      isLogin: true,
      message: 'You are already logged in',
      token : req.headers.authorization.split(' ')[1],
      user: user
    });
  })
};