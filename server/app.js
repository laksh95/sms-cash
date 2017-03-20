let express=require('express');
let app=express();
let socket= require('./config');

let models  = require('./sqldb');


require("./config/express")(app); // for static call and middleware
var route= require("./routes/route")(app);
//route.init(app);

app.listen(socket.port, function () {

  console.log('Server listening on port ' +  socket.port + '!')
});

