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
    }
}
export default utils ;
