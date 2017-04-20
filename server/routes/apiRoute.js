let checkRole= require('./../config/roleCheck');
let express=require('express')

let apiRouter = (app) => {

  app.use('/api/department',checkRole(['admin','teacher']), require('../api/department'))
  app.use('/api/course',checkRole(['teacher','admin']), require('../api/course'))
  app.use('/api/teacher',checkRole(['teacher','admin']), require('../api/teacher'))
  app.use('/api/subject',checkRole(['teacher','admin']), require('../api/subject'))
  app.use('/api/feedback',checkRole(['teacher','admin']), require('../api/feedback'))
  app.use('/api/post',checkRole(['admin']), require('../api/post'));
  app.use('/api/student',checkRole(['admin']), require('../api/student'));

  app.get('/api/check', (req, res) => {
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
