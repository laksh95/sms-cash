let path = require('path');
let express = require('express');
let bodyParser = require("body-parser");
let init=function(app){
    app.use(express.static(path.resolve(__dirname+"/../../client/public")));
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());
}
module.exports=init;