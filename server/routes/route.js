let path=require('path')
let init=(app)=>{
    app.use('/api/course',require('../api/course'))
    app.use('/api/department',require('../api/department'))
    app.use('/api/student',require('../api/student'))
    app.get('/*',function (req, res) {
        console.log("other routes");
        res.sendFile(path.resolve(__dirname+('/../../client/src/index.html')));
    })
}
module.exports=init