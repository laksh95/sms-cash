let config = require('./config/environment');
let express = require('express')
let app = express()
let db=require('./config/db')
let passport = require('passport');
require('./config/express')(app)
require('./routes/route.js')(app)
const localLoginStrategy = require('./passport/loginStrategy');
passport.use('local-login', localLoginStrategy);
function startServer() {
	app.listen(config.port, config.ip, function() {
		console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
	});
}
db.connection.sync().then(function() {
		startServer()
	});
// Expose app
exports = module.exports = app;