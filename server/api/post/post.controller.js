let post = require('./post.model')()
let models = require('./../../sqldb')()

module.exports = {
    addPost : (req,res) => {
        if (req.body){
            post.addPost(models,req.body,(error,result) => {
                if(result){
                    console.log("Result",Object.keys(result).length)
                    if(Object.keys(result).length>0)
                        res.status(200).json({data:result,message:"SUCCESSFUL_INSERTION"})
                    else
                        res.status(500).json({data:[], message: 'NO_ROW_INSERTED'});
                }
                else {
                    if(error=='IS_ALREADY_EXISTS')
                        res.status(400).json({error:'Curriculum already exists', message: 'IS_ALREADY_EXISTS'});
                    else
                        res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                }
            })
        }
        else {
            res.status(400).json({error: "Missing Parameters", message: 'IS_INVALID_INPUT_FORM'});
        }
    }
}
