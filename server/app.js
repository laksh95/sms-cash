let express=require('express');
let app=express();
let getport=require('./config');
require("./config/express")(app);
let database=require('./sqldb');
database();
app.listen(getport.port);