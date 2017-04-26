let post = require('./post.model')()
let models = require('./../../sqldb')()
module.exports = {
    addPost : (req,res) => {
        if (req.body){
            post.addPost(models,req.body,(error,result) => {
                if(result){
                    //console.log(result)
                    if(Object.keys(result).length>0)
                        res.status(200).json({data:result,message:"SUCCESSFUL_INSERTION"})
                    else
                        res.status(500).json({data:[], message: 'NO_ROW_INSERTED'});
                }
                else {
                    if(error==='IS_ALREADY_EXISTS')
                        res.status(400).json({error:error, message: 'IS_ALREADY_EXISTS'});
                    else
                        res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                }
            })
        }
        else {
            res.status(400).json({error: "Missing Parameters", message: 'IS_INVALID_INPUT_FORM'})
        }
    },
    getPosts :(req,res) =>{
        console.log('inside controller')
        if(req.body){
            post.getPosts(models,req.body,(error,result)=>{
                console.log("result of controller",result)
                if(result){
                    if(result.length>0)
                        res.status(200).json({data:result,message:"SUCCESSFULLY_FETCHED"})
                    else
                        res.status(500).json({data:[], message: 'NO_ROWS_FOUND'})
                }
                // else {
                //     if(error=='NO_ROWS_FOUND')
                //         res.status(400).json({error:'No Posts to show', message: 'IS_ALREADY_EXISTS'});
                //     else
                //         res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'})
                // }
            })
        }
    },
    getPost : (req,res) =>{
        if(req.body){
            post.getPost(models,req.body,(error,result)=>{
                if(result){
                    res.status(200).json({data:result,message:"SUCCESSFULLY_FETCHED"})
                }
                else {
                    res.status(500).json({data:[], message: 'NO_ROWS_FOUND'})
                }
            })
        }
    },
    addComment :(req,res) =>{
        if(req.body){
            post.addComment(models,req.body,(error,result) =>{
                console.log(result)
                if(result){
                    res.status(200).json({data:result ,message: "SUCCESSFULLY_ADDED"})
                }
                else{
                    res.status(500).json({data:[], message: 'NO_ROW_INSERTED'});
                }
            })
        }
    },
    editComment : (req,res)=>{
        if(req.body){
            console.log("req.body",req.body)
            post.editComment(models,req.body,(error,result) =>{
                // console.log(result)
                if(result){
                    res.status(200).json({data:result ,message: "SUCCESSFULLY_EDITED"})
                }
                else{
                    res.status(500).json({data:[], message: 'NO_ROW_EDITED'});
                }
            })
        }
    },
    deleteComment : (req,res)=>{
        if(req.body){
            console.log("req.body",req.body)
            post.deleteComment(models,req.body,(error,result) =>{
                if(result){
                    res.status(200).json({data:result ,message: "SUCCESSFULLY_DELETED"})
                }
                else{
                    res.status(500).json({data:[], message: 'NO_ROW_DELETED'});
                }
            })
        }
    },
    setLikes : (req,res)=>{
        if(req.body){
            post.setLikes(models,req.body,(error,result)=>{
                if(result){
                        res.status(200).json({data:result ,message: "SUCCESSFULLY_LIKED"})
                }
                else{
                    res.status(500).json({data:[], message: 'UNSUCCESSFUL'});
                }
            })

        }
    },
    getStats:(req,res)=>{
        if(req.body){
            post.getStats(models,req.body,(error,result)=>{
                if(result){
                    res.status(200).json({data:result ,message: "SUCCESSFULLY_FETCHED"})
                }
                else{
                    res.status(500).json({data:[], message: 'UNSUCCESSFUL'});
                }
            })

        }
    },
    deletePost :(req,res)=>{
        if(req.body){
            post.deletePost(models,req.body,(error,result)=>{
                if(result){
                    res.status(200).json({data:result ,message: "SUCCESSFULLY_DELETED"})
                }
                else{
                    res.status(500).json({data:[], message: 'UNSUCCESSFUL'});
                }
            })
        }
    },
    searchPost :(req,res)=>{
        if(req.body){
            post.searchPost(models,req.body,(error,result)=>{
                if(result){
                    res.status(200).json({data:result,message:"SUCCESSFUL"})
                }
                else {
                    res.status(500).json({data:[],message : 'UNSUCCESSFUL'})
                }
            })
        }
    },
    getComments:(req,res)=>{
        if(req.body){
            post.getComments(models,req.body,(error,result)=>{
                if(result){
                    res.status(200).json({data:result,message:"SUCCESSFUL"})
                }
                else {
                    res.status(500).json({data:[],message : 'UNSUCCESSFUL'})
                }
            })
        }
    }
}