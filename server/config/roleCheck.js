
module.exports= (accessArray) => {
    let flag = 0
    return (req, res, next) => {
        if(!accessArray){
            flag=1;
            next();
        }
        for(let i=0; i<accessArray.length; i++){
            if(req.user.role.indexOf(accessArray[i])>-1){
                console.log("Successful role check");
                flag=1;
                next();
                break;
            }
        }
        if(flag === 0){
            console.log("-------------Role check failed!--------------")
            res.status(403).end();
        }
    }
}