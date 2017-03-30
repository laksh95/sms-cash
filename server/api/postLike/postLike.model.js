let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let postLike = connection.define('post_like',{
            id:{
                type :sequelize.INTEGER ,
                primaryKey : true ,
                autoIncrement : true,
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
                    let userDetail = models.user_detail
                    post.hasMany(postLike,{
                        foreignKey :"post_id"
                    })
                    userDetail.hasMany(postLike,{
                        foreignKey : "liked_by"
                    })
                }
            }
        }
    );
    return postLike;
}
module.exports = sql;

