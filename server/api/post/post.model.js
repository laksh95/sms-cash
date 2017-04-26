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
                    let post = models.post
                    post.create({
                        heading ,
                        content ,
                        by :  1
                    }).then(function(response){
                        // console.log("inside then ",response.dataValues)
                        cb(null,response.dataValues)
                    })
                    .catch(function(error){
                        cb(error,null)
                    })
                },
                getPosts:function(models,data,cb){
                    console.log("Inside GetPosts")
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
                        console.log("inside then",response)
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
                                    offset :1,
                                    limit : 5 ,
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
                                                // console.log("-------------------------------->>",r.dataValues)
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
                    // to be continued
                    // let postObj = data.post
                    // let likes = data.likes
                    console.log("inside setLikes",data.post.id)
                    console.log("inside setLikes",data.user_id)
                    let postLike = models.post_like
                    postLike.findOne({
                        where : {
                            post_id : data.post.id,
                            liked_by : data.user_id,
                        }
                    }).then((response)=>{
                        console.log(response)
                        if(response!=null){
                            console.log(response.dataValues)
                            postLike.update({
                                status :data.liked
                            },{
                                where :{
                                    post_id:data.post.id,
                                    liked_by :data.user_id
                                }
                            }).then((response)=>{
                                console.log(response)
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
                                  console.log(response)
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
                    console.log(data)
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
                        console.log(result)
                        cb(null,result)
                    })
                    .catch((error)=>{
                        cb(error,null)
                    })
                },
                deletePost:function(models,data ,cb){
                    console.log(data)
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
                        // console.log(posts)
                        let headings = []
                        for(let index in posts){
                            console.log(posts[index].heading.toLowerCase())
                            console.log(data.heading)
                            if(posts[index].heading.toLowerCase().indexOf(data.heading)!==-1){
                                headings.push(posts[index])
                            }
                        }

                        cb(null,headings)
                    })

                },
                getComments:function(models,data,cb){
                    let postComment = models.post_comment
                    console.log(data.pageNumber)
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
                        console.log(comments)
                        cb(null,comments)
                    })
                }
            }
        }
    );
    return post;
}
module.exports = sql;