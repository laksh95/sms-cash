import axios from 'axios'
import * as types from './../constants';
import blog from './../utils/api/blog';

export function openModal(data){
    return {
        type: types.OPEN_MODAL,
        payload : data
    }
}
export function getPosts(){
    return{
        type:types.GET_POSTS,
        payload : blog.getPosts()
            .then((response) => {
                return response.data
            })
        }
}
export function getPost(data){
    return {
        type : types.GET_POST,
        payload : blog.getPost(data)
            .then((response) =>{
                return response.data
            })
    }
}
export function addComment(data){
    return {
        type : types.ADD_COMMENT,
        payload: blog.addComment(data)
            .then((response)=>{
                return response.data
            })
    }
}
export function editComment(data){
    return {
        type : types.EDIT_COMMENT ,
        payload : blog.editComment(data)
            .then((response)=>{
                return response.data
            })
    }
}
export function deleteComment(data){
    return {
        type : types.DELETE_COMMENT,
        payload : blog.deleteComment(data)
                .then((response)=>{
                    return response.data
                })
    }
}
export function setLikes(data){
    return {
        type:types.SET_LIKES,
        payload : blog.setLikes(data)
            .then((response)=>{
                return response.data
            })
    }
}
export function addPost(data){
    return {
        type : types.ADD_POST,
        payload : blog.addPost(data)
            .then((response)=>{
                return response.data
            })
    }
}
export function getStats(data){
    return {
        type:types.GET_STATS,
        payload : blog.getStats(data)
            .then((response)=>{
                return response.data
            })
    }
}
export function setPost(data){
    return {
        type:types.SET_POST ,
        payload: data
    }
}
export function deletePost(data){
    return {
        type:types.DELETE_POST ,
        payload : blog.deletePost(data)
            .then((response)=>{
                return response.data
            })
    }
}
export function setShowEdit(data){
    return {
        type : types.SET_SHOW_EDIT,
        payload : data
    }
}
export function setCurrentLike(data){
    return {
        type:types.SET_CURRENT_LIKE,
        payload : data
    }
}
export function searchPost(data){
    return {
        type : types.SEARCH_POST,
        payload :blog.searchPost(data)
            .then((response)=>{
                return response.data
            })
    }
}
export function setSnackbarOpen(data){
    return {
        type : types.SET_SNACKBAR_OPEN,
        payload : data
    }
}
export function getComments(data){
    return {
        type:types.GET_COMMENTS,
        payload :blog.getComments(data)
            .then((response)=>{
                return response.data
            })
    }
}