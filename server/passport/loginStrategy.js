let userDetail= require('./../api/userDetail/userDetail.model')();
let passportLocalStrategy = require('passport-local').Strategy;
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let models  = require('./../sqldb')();
let config= require('./../config');

/**
 * Return the Passport Local Strategy object.
 */

module.exports= new passportLocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
},	(req, username, password, cb)=> {
		const userData={
			username: username.trim(),
			password: password.trim()
		}

	return userDetail.getUserByCredential(models, userData.username, (err, user)=> {
		if (err) { console.log("Passport received error", err); return cb(err); }
		if (!user) {
			const error = new Error('Incorrect username or password'); 
			error.name = 'IncorrectCredentialsError';
			return cb(error); 
		}
		if (user.password != password) {
			console.log("Passport: Invalid username");
			const error = new Error('Incorrect username or password'); 
			error.name = 'IncorrectCredentialsError';
			return cb(error); 
		}
		const payload={
			sub: user.id
		}

		// create a token string
      	const token = jwt.sign(payload, config.jwtSecret
      		// , {
        // 		expiresInMinute: 1440
      		// 	}
      	);
      	const data = {
	        name: user.name,
	        role: user.role
      	};

      	return cb(null, token, data);
	})

})

