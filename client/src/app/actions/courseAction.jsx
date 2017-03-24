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