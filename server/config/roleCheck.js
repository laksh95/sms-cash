
module.exports= (accessArray) => {
	return (req, res, next) => {
		if(!accessArray){
			next();
		}
		for(let i=0; i<accessArray.length; i++){
			console.log("In for loop");
			if(req.user.role.indexOf(accessArray[i])>-1){
				next();
			}
		}
		console.log("-------------Role check failed!--------------")
		res.status(401).end();
	}
}