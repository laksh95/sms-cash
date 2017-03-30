let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let postFollowed = connection.define('post_followed',{
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
                    // one to one with post
                    post.hasOne(postFollowed,{
                        foreignKey : "post_id"
                    })
                    userDetail.hasMany(postFollowed,{
                        foreignKey : "uploaded_by"
                    })
                }
            }
        }
    );
    return postFollowed;
}
module.exports = sql;

