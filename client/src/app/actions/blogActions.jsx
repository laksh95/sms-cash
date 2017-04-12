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