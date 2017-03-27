let init=function(app){
    app.use('/api/course',require('../api/course')) 
}
module.exports=init