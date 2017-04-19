let checkRole= require('./../config/roleCheck');
let path= require('path');

module.exports = (app) => {
    const authRoutes = require('./authRoute');
    const apiRoutes = require('./apiRoute')(app);
    app.use('/auth', authRoutes);
    app.use('/api',require('./apiRoute'));
};

