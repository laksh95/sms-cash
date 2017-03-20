let bodyParser=require('body-parser')
let init = function (app) {
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
};
module.exports=init
