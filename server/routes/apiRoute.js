
module.exports=function(app){
	console.log("In routes file------------------------",app);

	app.use('/department',require('../api/department'));
    app.use('/course',require('../api/course'));
};
