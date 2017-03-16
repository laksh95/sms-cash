let model = require('./sample.model.js')();
let path = require('path');
let models = require('./../../sqldb/index');
let db = models();

let data = {
    insert :  function(req,response){
        if(req.method=='POST'){
            let id   = req.body.id ;
            let content = req.body.content ;
            let data = {
                id : id ,
                content : content
            }
            model.insertData(db,data)
        }
        else {
            response.send("Unauthorize request");
        }
    },
    view : function(req,response){
        if(req.method=='POST'){
            model.viewData(db,function(data){
                console.log(data)
            })

        }
        else{
            response.send("Unauthorize request");
        }
    }
}
module.exports = data ;