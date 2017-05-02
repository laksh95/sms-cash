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
import {serverAddress} from '../../constants'
const utils={
    addBulkStudent: (fileContent)=>{
        let url= serverAddress + '/api/student/addBulkStudent'
        let config=configHeader()
        return axios.post(url,fileContent,config)
    },
    deleteStudent:(data)=>{
      let url = serverAddress + '/api/student/deleteStudentDetails'
        let config = configHeader()
        return axios.put(url,data,config)
    },
    studentDetails:(data)=>{
        console.log('--------util api being called-----',data)
        let url = serverAddress + '/api/student/getStudentDetails'
        let config = configHeader()
        return axios.post(url,data,config)
    },
    addStudent: (data)=>{
        let url= serverAddress + '/api/student/addStudent'
        let config=configHeader()
        return axios.post(url,data,config)
    },
    getInitialData: (courseID)=>{
        let url = serverAddress + '/api/student/getInitialData'
        let config = configHeader()
        let data=courseID
        return axios.post(url,data,config)
    },
    getFilteredStudent : (departmentId, semester, batchId)=>{
        let url = serverAddress + '/api/student/getStudents'
        let config = configHeader()
        console.log('-----util api called----getFilteredStudent-----',departmentId,semester,batchId)
        let data={
            departmentId,
            semester,
            batchId
        }
        console.log(data,'------util api file-----')
        return axios.post(url, data, config)
    }
}
export default utils
