export function isAllAlphabets(value) {
   if (!/^[a-zA-Z]*$/g.test(value)) {
       return true;
   }
   return false ;
}
export function isEmpty(value){
   if(value.trim()=="")
       return true;
   return false ;
}


export function isLengthInvalid(value, min, max){
	value= value.trim();
	if(value.length<min || value.length>max)
		return true;
	return false;
}

