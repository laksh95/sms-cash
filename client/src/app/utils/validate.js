export const isEmpty=(name)=>{
    if(name.trim()===""){
        return true
    }
    return false
}
export const checkCharacter =(name)=>{
    if(!/^[a-zA-Z]*$/gm.test(name)){
        return true
    }
    return false

}