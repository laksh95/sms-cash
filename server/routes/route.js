let checkRole= require('./../config/roleCheck');

let path= require('path');

module.exports=function(app){
	const authRoutes = require('./authRoute');
	// const apiRoutes = require('./apiRoute');
	app.use('/auth', authRoutes);
	//app.use('/api',require('./apiRoute')(app));
	app.use('/api/department',checkRole(['admin']), require('../api/department'));
    app.use('/api/course',checkRole(['teacher']), require('../api/course'));
};
