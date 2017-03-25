let path=require('path')
let init=function(app){
    app.use('/api/course',require('../api/course'))
    app.use('/api/department',require('../api/department'))
    app.get('/*',function (req, res) {
        console.log("other routes");
        res.sendFile(path.resolve(__dirname+('/../../client/src/index.html')));
    })
}
module.exports=init