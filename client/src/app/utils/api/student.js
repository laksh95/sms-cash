/**
 * Created by mustang on 30/03/17.
 */
import axios from 'axios'
import Auth from '../../Auth'
let configHeader= ()=> {
    let token = Auth.getToken();
    let authString = 'bearer ' + token;
    return  {
        headers: {
            'Authorization': authString
        }
    }
}
let baseAddress = 'http://localhost:3000'
const utils={
    addBulkStudent: (fileContent)=>{
        let url= baseAddress + '/api/student/addBulkStudent'
        let config=configHeader()
        return axios.post(url,fileContent,config)
    },
    addStudent: (data)=>{
        let url= baseAddress + '/api/student/addStudent'
        let config=configHeader()
        return axios.post(url,data,config)
    },
    getDepartmentList: (courseID)=>{
        let url = baseAddress + '/api/student/getInitialData'
        let config = configHeader()
        let data={
            courseID
        }
        return axios.post(url,data,config)
    }
}
export default utils
