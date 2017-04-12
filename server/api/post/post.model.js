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
                    .catch(function(error){
                        cb(error,null)
                    })
                },
                getPosts:function(models,data,cb){
                    let post = models.post
                    post.findAll({
                        where :{
                            status :true 
                        }
                    }).then(function(response){
                        console.log(response[1].dataValues)
                        let posts = []
                        for(let index in response){
                            posts.push(response[index].dataValues)
                        }
                        cb(null,posts)
                    })
                    .catch(function(error){
                        cb(error,null)
                    })

                }
            }
        }
    );
    return post;
}
module.exports = sql;

