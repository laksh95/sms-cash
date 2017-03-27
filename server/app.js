let config = require('./config/environment');
let express = require('express')
let app = express()
let db=require('./config/db')
require('./config/express')(app)
function startServer() {
	app.listen(config.port, config.ip, function() {
		console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
	});
}
db.connection.sync().then(function() {
		startServer()
	});
require('./routes/route.js')(app)
// Expose app
exports = module.exports = app;