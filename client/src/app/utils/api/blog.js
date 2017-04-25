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
    },
    setLikes : (data)=>{
        let url = serverAddress + 'api/post/setLikes';
        let config= configHeader();
        return axios.post(url,data,  config);
    },
    addPost : (data)=>{
        let url = serverAddress + 'api/post/addPost';
        let config= configHeader();
        // let formData = new FormData()
        // formData.append('file',data.image)
        // formData.append('name',data.image.name)
        // formData.append('type',data.image.type)
        // formData.append('heading',data.heading)
        // formData.append('content',data.content)
        return axios.post(url,data,config);
    },
    getStats :(data)=>{
        let url = serverAddress + 'api/post/getStats';
        let config= configHeader();
        console.log("inside util",data)
        return axios.post(url,data,config)
    },
    deletePost :(data)=>{
        let url = serverAddress + 'api/post/deletePost';
        let config= configHeader();
        return axios.post(url,data,config)

    },
    searchPost : (data)=>{
        let url = serverAddress + 'api/post/searchPost';
        let config= configHeader();
        return axios.post(url,data,config)
    },
    getComments:(data)=>{
        let url = serverAddress + 'api/post/getComments'
        let config = configHeader()
        return axios.post(url,data,config)
    }
}
export default utils ;