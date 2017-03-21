const express = require('express');
const passport = require('passport');
const validator = require('validator');
const router = new express.Router();

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
	const errors = {};
	let isFormValid = true;
	let message = '';

	if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
	    isFormValid = false;
	    errors.email = 'Please provide your username';
	  }

	if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
	    isFormValid = false;
	    errors.password = 'Please provide your password.';
	}

	if (!isFormValid) {
	    message = 'Check the form for errors.';
	}

	console.log("success: ", isFormValid);
	console.log("message: ", message);
	console.log("errors:", errors);
	return {
	    success: isFormValid,
	    message,
	    errors
	};
}

router.post('/login', (req, res, next) => {
 	const validationResult = validateLoginForm(req.body);
  	if (!validationResult.success) {
    	return res.status(400).json({
	      success: false,
	      message: validationResult.message,
	      errors: validationResult.errors
    	});
  	}

  	return passport.authenticate('local-login',(err, token, userData) => {
  		if(err){
  			console.log("Error:", err);
  			if(err.name==='IncorrectCredentialsError'){
  				return res.status(400).json({
  					success: false,
         			message: err.message
  				});
  			}

  			return res.status(400).json({
  				success: false,
        		message: 'Could not process the form.'
  			});
  		}

  		return res.json({
  			sucess: true,
  			message: 'You have successfully logged in!',
  			token,
  			user: userData
  		});
  	})(req, res, next);
})

module.exports = router;
