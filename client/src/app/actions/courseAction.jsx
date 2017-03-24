export function setCourse(course){
    return {
        type : "setCourse",
        payload : course
    }
}
export function setPagedCourse(course){
    return {
        type : "setPagedCourse",
        payload : course
    }
}
export function setSnackbarOpen(data){
    return {
        type :"setSnackbarOpen",
        payload : data
    }
}
export function setSnackbarMessage(data){
    return {
        type : "setSnackbarMessage",
        payload : data
    }
}
export function setValue(value){
    return {
        type :"setValue",
        payload : value
    }
}