var address=require('./config')
var express=require('express')
var app=express()
require('./config/express')(app)
require('./routes/route.js')(app)
var sql=require('./sqldb')
app.listen(address.port,function () {
    console.log('server running on port', address.port)

})
