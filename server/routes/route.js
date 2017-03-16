let path = require('path');
let controller=require('./controller');
let init=function(app){
    app.get('/',function(req,response){
        response.sendFile(path.resolve(__dirname + '/../client/index.html'));
    });
    app.use('../api/sample',require('../api/sample'));
}
module.exports = init;