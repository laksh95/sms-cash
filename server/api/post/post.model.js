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
                    let content = data.content.toString('html')
                    let image = data.image
                    let post = models.post
                    post.create({
                        heading ,
                        content ,
                        by :  1,
                        image
                    }).then(function(response){
                        let post = response.dataValues
                        models.user_detail.findOne({
                            attributes:['name','profile_pic_url'],
                            where:{
                                id:post.by
                            }
                        }).then(function(response){
                            post.user_name = response.dataValues.name
                            post.profile_pic_url = response.dataValues.profile_pic_url
                            // console.log("response",response.dataValues)
                            let postLike = models.post_like
                            postLike.findOne({
                                where : {
                                    status : 't',
                                    post_id : post.id,
                                    liked_by : 1
                                }
                            }).then(function(response){
                                if(response!==null){
                                    post.liked = true
                                }
                                else
                                    post.liked =false

                                postLike.count({
                                    where :{
                                        post_id  :post.id
                                    }
                                }).then(function(response){
                                    post.likes = response
                                    let postComment= models.post_comment
                                    postComment.count({
                                        where : {
                                            post_id : post.id,
                                            status : true
                                        }
                                    }).then(function(response){
                                        post.comments = response
                                        cb(null,post)
                                    })
                                })
                            })
                        })
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
                        offset : (data.pageNumber-1)*5 ,
                        limit : 5,
                        where :{
                            status :true
                        }
                    }).then(function(response){
                        let posts = []
                        for(let index in response){
                            posts.push(response[index].dataValues)
                        }
                        let likedPromises= []
                        let postLike = models.post_like
                        for(let index in posts){
                            promises.push(userDetail.findAll({
                                attributes:['name','profile_pic_url'],
                                where:{
                                    id:posts[index].by
                                }
                            }))
                            likedPromises.push(postLike.findOne({
                                where : {
                                    status : 't',
                                    post_id : posts[index].id,
                                    liked_by : data.user_id
                                }
                            }))
                        }
                        Promise.all(likedPromises).then(resultData=>{
                            for(let index in resultData){
                                if(resultData[index]!==null)
                                    posts[index].liked=true
                                else
                                    posts[index].liked=false
                            }
                        })
                        let likePromises = []
                        let commentPromises = []
                        let postComment = models.post_comment
                        Promise.all(promises).then(data=>{
                            for(let index in data){
                                posts[index].user_name = data[index][0].dataValues.name
                                posts[index].profile_pic_url=data[index][0].dataValues.profile_pic_url
                                likePromises.push(postLike.count({
                                    where :{
                                        post_id  :posts[index].id
                                    }
                                }))
                                commentPromises.push(postComment.count({
                                    where : {
                                        post_id : posts[index].id,
                                        status : true
                                    }
                                }))
                            }
                            Promise.all(likePromises).then(data=>{
                                for(let index in data){
                                    posts[index].likes= data[index]
                                }
                                Promise.all(commentPromises).then(data=>{
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
                getPost : function(models , setData ,cb){
                    let post = models.post
                    post.findOne({
                        where :{
                            id : setData.id
                        }
                    }).then((response)=>{
                        if(response){
                            let postLike = models.post_like
                            postLike.count({
                                where : {
                                    post_id : response.dataValues.id,
                                    status : true
                                }
                            }).then((data)=>{
                                response.dataValues.likes = data
                                let postComment = models.post_comment
                                let commentPromises = []
                                postComment.findAll({
                                    offset :0,
                                    limit :4 ,
                                    order: 'created_at DESC',
                                    where : {
                                        post_id : response.dataValues.id,
                                        status : true
                                    }
                                }).then((comments)=>{
                                    let updatedComments = []

                                    for(let index in comments){
                                        updatedComments.push(comments[index].dataValues)
                                        commentPromises.push(models.user_detail.findAll({
                                            where : {
                                                id : comments[index].dataValues.comment_by
                                            }
                                        }))
                                    }

                                    Promise.all(commentPromises).then((result)=>{
                                        for(let index in result){
                                            updatedComments[index].user_name = result[index][0].dataValues.username
                                            updatedComments[index].profile_pic_url = result[index][0].dataValues.profile_pic_url
                                        }
                                        response.dataValues.comments = updatedComments
                                        let userDetail = models.user_detail
                                        userDetail.findAll({
                                            attributes:['name','profile_pic_url'],
                                            where:{
                                                id:response.dataValues.by
                                            }
                                        })
                                        .then((conclude)=>{
                                            response.dataValues.user_name = conclude[0].dataValues.name
                                            response.dataValues.profile_pic_url =conclude[0].dataValues.profile_pic_url
                                            postLike.findOne({
                                                where : {
                                                    status : 't',
                                                    post_id : setData.id,
                                                    liked_by : setData.user_id
                                                }
                                            }).then((r)=>{
                                                if(r!=null){
                                                    response.dataValues.liked = true
                                                }
                                                else {
                                                    response.dataValues.liked = false
                                                }
                                                cb(null,response.dataValues)
                                            })

                                        })
                                    })
                                })
                            })
                        }
                        else {
                            cb("NO_ROWS_FOUND",null)
                        }
                    })
                },
                addComment:function(models,data,cb){
                    let post = models.post
                    let postComment = models.post_comment
                    let content =data.content
                    let post_id = data.post_id
                    let comment_by = data.comment_by
                    postComment.create({
                        content ,
                        post_id,
                        comment_by
                    }).then(function(response){
                        cb(null,response.dataValues)
                    })
                    .catch(function(error){
                        cb(error,null)
                    })
                },
                editComment:function(models,data,cb){
                    let postComment = models.post_comment
                    let content = data.content
                    postComment.update(
                        {content},
                        { where: {id :data.id}}
                    ).then((response)=>{
                        cb(null,data)
                    }).catch((error)=>{
                        cb(error,null)
                    })
                },
                deleteComment : function(models,data,cb){
                    let postComment= models.post_comment
                    postComment.update(
                        {status : false} ,
                        { where: {id :data.id}}
                    ).then((response)=>{
                        cb(null,data)
                    }).catch((error)=>{
                        cb(error,null)
                    })
                },
                setLikes : function(models,data,cb){
                    let postLike = models.post_like
                    postLike.findOne({
                        where : {
                            post_id : data.post.id,
                            liked_by : data.user_id,
                        }
                    }).then((response)=>{
                        if(response!=null){
                            postLike.update({
                                status :data.liked
                            },{
                                where :{
                                    post_id:data.post.id,
                                    liked_by :data.user_id
                                }
                            }).then((response)=>{
                                cb(null,response)
                            }).catch((error)=>{
                                cb(error,null)
                            })
                        }
                        else{
                              postLike.create({
                                post_id : data.post.id ,
                                liked_by : data.user_id
                              }).then((response)=>{
                                  cb(null,response)
                              }).catch((error)=>{
                                  cb(error,null)
                              })
                        }
                    })
                },
                getStats:function(models,data,cb){
                    let post= models.post
                    let postLike = models.post_like
                    let postComment = models.post_comment
                    let result = {}
                    let promises = []
                    promises.push(post.count({
                        where : {
                            status : true ,
                            by : data.id
                        }
                    }))

                    promises.push(postLike.count({
                        where : {
                            status : true ,
                            liked_by : data.id
                        }
                    }))
                    promises.push(postComment.count({
                        where : {
                            status : true ,
                            comment_by : data.id
                        }
                    }))
                    Promise.all(promises).then((response)=>{
                        result.totalPosts = response[0]
                        result.totalLikes = response[1]
                        result.totalComments = response[2]
                        cb(null,result)
                    })
                    .catch((error)=>{
                        cb(error,null)
                    })
                },
                deletePost:function(models,data ,cb){
                    let post = models.post
                    post.update({
                        status : false
                    },{
                        where : {
                            status : true ,
                            id : data.id
                        }
                    }).then((response)=>{
                        cb(null,response)
                    })
                },
                searchPost:function(models,data,cb){
                    let post = models.post
                    let promises = []
                    promises.push(post.findAll({
                        where : {
                            status : true
                        }
                    }))
                    Promise.all(promises).then((result)=>{
                        let temp = result[0]
                        let posts = []
                        for(let index in temp){
                            posts[index]=temp[index].dataValues
                        }

                        let headings = []
                        for(let index in posts){
                            if(posts[index].heading.toLowerCase().indexOf(data.heading)!==-1){
                                headings.push(posts[index])
                            }
                        }
                        let userDetail = models.user_detail
                        promises = []
                        for(let index in headings){
                            promises.push(userDetail.findAll({
                                attributes:['name','profile_pic_url'],
                                where:{
                                    id:headings[index].by
                                }
                            }))
                        }
                        let likePromises = []
                        let commentPromises = []
                        let postLike = models.post_like
                        let postComment = models.post_comment
                        Promise.all(promises).then(data=>{

                            for(let index in data){

                                headings[index].user_name = data[index][0].dataValues.name
                                headings[index].profile_pic_url=data[index][0].dataValues.profile_pic_url
                                likePromises.push(postLike.count({
                                    where :{
                                        post_id  :headings[index].id
                                    }
                                }))
                                commentPromises.push(postComment.count({
                                    where : {
                                        post_id : headings[index].id,
                                        status : true
                                    }
                                }))
                            }
                            Promise.all(likePromises).then(data=>{
                                for(let index in data){
                                    headings[index].likes= data[index]
                                }
                                Promise.all(commentPromises).then(data=>{
                                    for(let index in data){
                                        headings[index].comments= data[index]
                                    }
                                    cb(null,headings)
                                })
                            })
                        })
                    })

                },
                getComments:function(models,data,cb){
                    let postComment = models.post_comment

                    postComment.findAll({
                        offset:(data.pageNumber-1)*5,
                        limit: 5,
                        order: 'created_at DESC',
                        where :{
                            post_id : data.id ,
                            status : true ,
                        }
                    }).then((response)=>{
                        let comments = []
                        for(let index in response){
                            comments.push(response[index].dataValues)
                        }

                        cb(null,comments)
                    })
                }
            }
        }
    );
    return post;
}
module.exports = sql;