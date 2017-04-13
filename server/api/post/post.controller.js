let post = require('./post.model')()
let models = require('./../../sqldb')()

module.exports = {
    addPost : (req,res) => {
        if (req.body){
            post.addPost(models,req.body,(error,result) => {
                if(result){
                    if(Object.keys(result).length>0)
                        res.status(200).json({data:result,message:"SUCCESSFUL_INSERTION"})
                    else
                        res.status(500).json({data:[], message: 'NO_ROW_INSERTED'});
                }
                else {
                    if(error=='IS_ALREADY_EXISTS')
                        res.status(400).json({error:'Post already exists', message: 'IS_ALREADY_EXISTS'});
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
        if(req.body){
            post.getPosts(models,req.body,(error,result)=>{
                // console.log("Result",result)
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
    getPost :(req,res) =>{
        if(req.body){
            post.getPost(models,req.body,(error,result)=>{
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
    }
}
