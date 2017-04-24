import axios from 'axios'
import Auth from './../../Auth.js';

let serverAddress = 'http://localhost:3000'
const utils = {
    addCourse : (data) => {
        let url = serverAddress + '/api/course/addCourse'
        let token = Auth.getToken();
        let authString = 'bearer ' + token;
        let config = {
            headers: {
                'Authorization': authString
            }
        }
        return axios.post(url,data,config)
    },
    sendOTP:()=>{

    },
    generateOTP:()=>{
        let url = serverAddress + '/api/course/generateOTP'
        let token = Auth.token()
        let authString = 'bearer' + token
        let config={
            'Authorization':authString
        }
        return axios.get(url,config)
    },
    getCourses : () => {
        let url = serverAddress + '/api/course/getCourses'
        let token = Auth.getToken();
        let authString = 'bearer ' + token;
        let config = {
            headers: {
                'Authorization': authString
            }
        }
        return axios.get(url,config)
    },
    editCourse : (data) => {
        let url = serverAddress + '/api/course/editCourse'
        let token = Auth.getToken();
        let authString = 'bearer ' + token;
        let config = {
            headers: {
                'Authorization': authString
            }
        }
        return axios.put(url,data,config)
    },
    deleteCourse : (data) => {
        console.log("inside util",data)
        let url = serverAddress + '/api/course/deleteCourse'
        let token = Auth.getToken();
        let authString = 'bearer ' + token;
        let config = {
            headers: {
                'Authorization': authString
            }
        }
        return axios.put(url,data,config)
    }
}
export default utils