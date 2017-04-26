'use strict';
let path = require('path');
let lodash= require('lodash');
function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}
// All configurations will extend these options
// ============================================
let all = {
  env: process.env.NODE_ENV,
  // Root path of server
  root: path.normalize(__dirname + '/../../..'),
  // Server port
  port: process.env.PORT || 3000,
};
// Export the config object based on the NODE_ENV
// ==============================================

//module.exports= require('./development.js') || {};

//module.exports= require('./' + process.env.NODE_ENV + '.js') || {};
module.exports = lodash.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
