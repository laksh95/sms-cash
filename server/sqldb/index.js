let sequelize = require ('sequelize');
let path = require('path');
let models = ['sample'];
let db ={};
let format = path.join(__dirname ,'../api/{0}/{0}.model.js');
for(let i in models){
    let model = require(format.replace(/\{0\}/g,models[i]))();
    db[model.name]=model;
}
Object.keys(db).forEach(function(modelName){
    if('associate' in db[modelName]){
        console.log("associate:",modelName)
        db[modelName].associate(db);
    }
});
let sql = function(){
    return db;
}
module.exports  = sql ;