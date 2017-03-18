var express=require('express');
var app=express();
var socket= require('./config');

var models  = require('./sqldb');


//require("./config/express")(app); // for static call and middleware
//var route= require("./routes/routes")(app);
//route.init(app);

app.listen(socket.port, function () {

  console.log('Server listening on port ' +  socket.port + '!')
});

