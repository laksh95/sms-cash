let portNumber =  require('./config')
let express = require('express')
let app = express()

require("./sqldb")();

function serverSuccessMessage(){
	console.log("Server running");
}
app.listen(portNumber.port, serverSuccessMessage());
