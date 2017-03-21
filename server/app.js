let express=require('express');
let app=express();
let socket= require('./config');

let models  = require('./sqldb');

let userDetail= require('./api/userDetail/userDetail.model')();
let passport = require('passport');
let Strategy = require('passport-local').Strategy;


require("./config/express")(app); // for static call and middleware
var route= require("./routes/route")(app);
//route.init(app);

passport.use(new Strategy(
  function(username, password, cb) {
  	let model= models();
  	console.log("In passport use");
  	userDetail.getUserByCredential(model, username,password, function(err, user){
      if (err) { console.log("Passport received error", err); return cb(err); }
      if (!user) { console.log("Passport: Invalid username"); return cb(null, false); }
      if (user.password != password) {console.log("Passport: Invalid Password"); return cb(null, false); }
      console.log("user:", user);
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
	console.log("Passport seialize User:", user);
	cb(null, user.id);
});


passport.deserializeUser(function(id, cb) {
	console.log("Passport deseirialize User Id: ", id);
	// db.users.findById(id, function (err, user) {
 //    	if (err) { return cb(err); }
 //    	cb(null, user);
 //  });
});

app.post('/api/userDetail', 
  passport.authenticate('local', {successFlash: 'Welcome!',failureFlash: 'Invalid username or password.'}),
  function(req, res) {
  	console.log("Passport authenticate");
    res.send(req.user);
  });
  

app.listen(socket.port, function () {
  console.log('Server listening on port ' +  socket.port + '!')
});

