let init=function(app){
    app.use('/api/course',require('../api/course'))
    app.use('/api/department',require('../api/department'))
}
module.exports=init
