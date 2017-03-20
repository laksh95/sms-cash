var portNumber =  require('./config')
var express = require('express')
var app = express()

require("./config/express.js")(app);
require("./sqldb")();
require("./routes/route.js")(app);


function serverSuccessMessage(){
	console.log("Server running");
}

app.listen(portNumber.port, serverSuccessMessage());
