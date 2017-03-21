let express=require('express');
let app=express();
let socket= require('./config');

let models  = require('./sqldb');

let passport = require('passport');

require("./config/express")(app); // for static call and middleware

var route= require("./routes/route")(app);
//route.init(app);


// load passport strategies
const localLoginStrategy = require('./passport/loginStrategy');
//passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

app.listen(socket.port, function () {
  console.log('Server listening on port ' +  socket.port + '!')
});


