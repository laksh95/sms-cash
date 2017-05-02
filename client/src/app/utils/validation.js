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

export function isName(name){
    console.log('validation called')
     let specialCharacter = name.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
     let number = name.match(/\d+/g)
     if(specialCharacter!==null || number !==null){
         return false
     }
     else
         return true

}
export const checkCharacter =(name)=>{
    if(!/[a-zA-Z]+([\s][a-zA-Z]+)*/.test(name)){
        return true
    }
    return false

}
export function isContactNumber(number){
    let num = number.match(/\d+/g)
    if(num === null)
        return false
    else
        return true
}
export function isEmail(email) {
    let mail = email.match(/\S+@\S+\.\S+/g)
    if (mail === null) {
        return false
    }
    else return true
}
export function validateEmail(email) {
    var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(email);
}
