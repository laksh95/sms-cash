let address=require('./config')
let express=require('express')
let app=express()
require('./config/express')(app)
require('./routes/route.js')(app)
let sql=require('./sqldb')
app.listen(address.port,function () {
    console.log('server running on port', address.port)

})
