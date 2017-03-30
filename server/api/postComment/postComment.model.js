let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let postComment = connection.define('post_comment',{
            id:{
                type :sequelize.INTEGER ,
                primaryKey : true ,
                autoIncrement : true
            },
            content : {
                type : sequelize.TEXT ,
                allowNull : false

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
                    let post = models.post
                    post.hasMany(postComment,{
                        foreignKey :"post_id"
                    })
                    let userDetail = models.user_detail
                    userDetail.hasMany(postComment,{
                        foreignKey :"comment_by"
                    })
                }
            }
        }
    );
    return postComment;
}
module.exports = sql;

