import axios from 'axios'
import course from './../utils/api/course';
import * as types from './../constants';

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
        type : "setSnackbarOpen",
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
export function addCourse(data){
    return {
        type : type.ADD_COURSE,
        payload : course.addCourse(data)
            .then((response) => {
                return response.data
            })
    }
}
export function editCourse(data) {
    return {
        type : type.EDIT_COURSE,
        payload : course.editCourse(data)
            .then((response) => {
                return response.data
            })
    }
}
export function deleteCourse(data) {
    return {
        type :type.DELETE_COURSE ,
        payload : course.deleteCourse(data)
            .then((response) => {
                return response.data
            })
    }
}