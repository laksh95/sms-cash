import axios from 'axios';
import Auth from './../../Auth.js';
let serverAddress = 'http://localhost:3000/'
let configHeader= ()=> {
    let token = Auth.getToken();
    let authString = 'bearer ' + token;
    return {
        headers: {
            'Authorization': authString
        }
    }
}
const utils ={
    getPosts : () =>{
        let url = serverAddress + 'api/post/getPosts';
        let config= configHeader();
        return axios.get(url,config);
    },
    getPost : (data) =>{
        let url = serverAddress + 'api/post/getPost';
        let config= configHeader();
        return axios.post(url,data,  config);
    },
    addComment : (data) =>{
        let url = serverAddress + 'api/post/addComment';
        let config= configHeader();
        return axios.post(url,data,  config);
    },
    editComment : (data) =>{
        let url = serverAddress + 'api/post/editComment';
        let config= configHeader();
        return axios.post(url,data,  config);
    },
    deleteComment : (data)=>{
        let url = serverAddress + 'api/post/deleteComment';
        let config= configHeader();
        return axios.post(url,data,  config);
    }
}
export default utils ;