let checkRole= require('./../config/roleCheck');

module.exports=function(){
	app.use('/department', checkRole(['admin']), require('../api/department'));
    app.use('/course', checkRole(['teacher']), require('../api/course'));
};
