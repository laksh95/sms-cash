import course from './../utils/api/course';
import * as types from './../constants';

export function setCourse(course){
    return {
        type : types.SET_COURSE,
        payload : course
    }
}
export function generateOTP(){
    return{
        type:'GENERATE_OTP',
        payload: course.generateOTP()
            .then((response)=>{
                return response
        })
    }
}
export function setPagedCourse(course){
    return {
        type : types.SET_PAGED_COURSES,
        payload : course
    }
}
export function setSnackbarOpen(data){
    return {
        type : types.SET_SNACKBAR_OPEN,
        payload : data
    }
}
export function setSnackbarMessage(data){
    return {
        type : types.SET_SNACKBAR_MESSAGE,
        payload : data
    }
}
export function setValue(value){
    return {
        type : types.SET_VALUE,
        payload : value
    }
}
export function getCourses(){
    return {
        type : types.GET_COURSES,
        payload : course.getCourses()
            .then((response) => {
                response.data.status= response.status
                return response.data
            })
    }
}
export function addCourse(data){
    return {
        type : types.ADD_COURSE,
        payload : course.addCourse(data)
            .then((response) => {
                response.data.status= response.status
                return response.data
            })
    }
}
export function editCourse(data) {

    return {
        type : types.EDIT_COURSE,
        payload : course.editCourse(data)
            .then((response) => {
                response.data.status= response.status
                return response.data
            })
    }
}
export function deleteCourse(data) {
    return {
        type :types.DELETE_COURSE ,
        payload : course.deleteCourse(data)
            .then((response) => {
                response.data.status= response.status
                return response.data
            })
    }
}
export function setPagination(data){
    return {
        type : types.SET_PAGINATION ,
        payload :data
    }
}

export function resetToNoError(){
    return {
        type: types.RESET_ERROR
    }
}
