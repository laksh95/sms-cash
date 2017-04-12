let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let post = connection.define('post',{
            id:{
                type :sequelize.INTEGER ,
                primaryKey : true ,
                autoIncrement : true,
            },
            heading :{
                type : sequelize.STRING,
                allowNull: false,
            },
            content : {
                type:sequelize.TEXT ,
                allowNull : false ,
            },
            image : {
                type : sequelize.STRING
            },
            status:{
                type:sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:true
            }
        },
        {
            classMethods : {
                associate : function(models){
                    let userDetail= models.user_detail
                    userDetail.hasMany(post,{
                        foreignKey:"by"
                    })
                },
                addPost:function(models,data,cb){
                    let heading = data.heading
                    let content = data.content
                    let post = models.post
                    post.create({
                        heading ,
                        content ,
                        by :  1
                    }).then(function(response){
                        cb(null,response.dataValues)
                    })
                }
            }
        }
    );
    return post;
}
module.exports = sql;

