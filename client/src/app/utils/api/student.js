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
    getInitialData: (courseID)=>{
        console.log('------>util------->student.js',courseID)
        let url = baseAddress + '/api/student/getInitialData'
        let config = configHeader()
        let data=courseID
        console.log('-----cofig',config)
        return axios.post(url,data,config)
    },
    getFilteredStudent : (department, semester, batch)=>{
        let url = baseAddress + 'api/student/getStudents'
        let config = configHeader()
        let data={
            department,
            semester,
            batch
        }
        return axios.post(url, data, config)
    }
}
export default utils
