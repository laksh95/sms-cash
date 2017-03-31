module.exports= (accessArray) => {
	return (req, res, next) => {
		let flag = 0
		if(!accessArray){
			next();
		}
		for(let i=0; i<accessArray.length; i++){
			console.log("In for loop",req.user.role)
			if(req.user.role.indexOf(accessArray[i])>-1){
				console.log("inside if")
				flag = 1
				next();
				break;
			}
		}
		if(flag == 0)
		{
			console.log("-------------Role check failed!--------------")
			res.status(401).end();
		}
	}
}
