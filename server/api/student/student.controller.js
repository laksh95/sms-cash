let model=require('./student.model')
let sql=require('../../sqldb')
let db=sql()
let studentFunction={
    addBulk: (req,res)=>{
        console.log('student controller called')
        console.log(req.body)
        res.send(req.body)
    }
}
module.exports=studentFunction