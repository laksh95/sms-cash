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
                    let userDetail = models.user_detail
                    let promises = []
                    post.findAll({
                        where :{
                            status :true 
                        }
                    }).then(function(response){
                        let posts = []
                        for(let index in response){
                            posts.push(response[index].dataValues)
                        }
                        for(let index in posts){
                            promises.push(userDetail.findAll({
                                attributes:['name','profile_pic_url'],
                                where:{
                                    id:posts[index].by
                                }
                            }))
                        }
                        let likePromises = []
                        let commentPromises = []
                        let postLike = models.post_like
                        let postComment = models.post_comment
                        console.log(postLike)
                        Promise.all(promises).then(data=>{
                            for(let index in data){
                                posts[index].user_name = data[index][0].dataValues.name
                                posts[index].profile_pic_url=data[index][0].dataValues.profile_pic_url
                                console.log(posts[index].id)
                                likePromises.push(postLike.count({
                                    where :{
                                        post_id  :posts[index].id
                                    }
                                }))
                                commentPromises.push(postComment.count({
                                    where : {
                                        post_id : posts[index].id
                                    }
                                }))
                            }
                            Promise.all(likePromises).then(data=>{
                                console.log("abcd")
                                for(let index in data){
                                    posts[index].likes= data[index]
                                }
                                Promise.all(commentPromises).then(data=>{
                                    console.log("nnnn")
                                    for(let index in data){
                                        posts[index].comments= data[index]
                                    }
                                    cb(null,posts)
                                })
                            })
                        })
                    })
                    .catch(function(error){
                        cb(error,null)
                    })
                },
                getPost : function(models , data ,cb){
                    let post = models.post
                    post.findOne({
                        where :{
                            id : data.id
                        }
                    }).then((response)=>{
                        if(response)
                            cb(null,response.dataValues)
                        else {
                            cb("NOT_ROWS_FOUND",null)
                        }
                    })
                }
            }
        }
    );
    return post;
}
module.exports = sql;

