// Set default node environment to development
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(env)
// Export the application
exports = module.exports = require('./app');
