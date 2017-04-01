let checkRole= require('./../config/roleCheck');
let express=require('express')
let path = require('path')

let apiRouter = (app) => {
  app.use('/api/academicCalendar', require(path.resolve(__dirname+"/../api/academicCalendar/index.js")));
  app.use('/api/parent', require(path.resolve(__dirname+"/../api/parent/index.js")));
  app.use('/api/personalCalendar', require(path.resolve(__dirname+"/../api/personalCalendar/index.js")));

  app.get('/api/check', (req, res) => {
    console.log(req.headers);
    let user ={};
    user.name= req.user.name;
    user.role= req.user.role;
    user.username= req.user.username;
    return res.json({
      isLogin: true,
      message: 'You are already logged in',
      token : req.headers.authorization.split(' ')[1],
      user: user
    });
  })
};

module.exports = apiRouter