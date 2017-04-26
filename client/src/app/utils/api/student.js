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
    deleteStudent:(data)=>{
      let url = baseAddress + '/api/student/deleteStudentDetails'
        let config = configHeader()
        return axios.put(url,data,config)
    },
    studentDetails:(data)=>{
        console.log('--------util api being called-----',data)
        let url = baseAddress + '/api/student/getStudentDetails'
        let config = configHeader()
        return axios.post(url,data,config)
    },
    addStudent: (data)=>{
        let url= baseAddress + '/api/student/addStudent'
        let config=configHeader()
        return axios.post(url,data,config)
    },
    getInitialData: (courseID)=>{
        let url = baseAddress + '/api/student/getInitialData'
        let config = configHeader()
        let data=courseID
        return axios.post(url,data,config)
    },
    getFilteredStudent : (departmentId, semester, batchId)=>{
        let url = baseAddress + '/api/student/getStudents'
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
