let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let sample = connection.define('sample',{
            id:{
                type :sequelize.INTEGER ,
                primaryKey : true ,
                autoIncrement : true
            },
            text : sequelize.TEXT
        },
        {
            classMethods : {
                associate : function(models){
                },
                insertData : function(models, data){
                    console.log("inserted")
                    this.create({
                        content : data.content,
                        user_id : data.id
                    })
                    .then(function(){
                        console.log("working ");
                    });
                },
                viewData : function(models,cb){
                    models.sample.findAll({
                        attributes:['id','text']
                    }).then(function(result){
                        let data = [] ;
                        data.push(result[0].dataValues);
                        cb(data);
                    });
                }
            }
        }
    );
    connection.sync();
    return sample;
}
module.exports = sql;