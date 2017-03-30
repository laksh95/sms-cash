/**
 * Created by mustang on 30/03/17.
 */
import axios from 'axios'
import Auth from '../../Auth'
let baseAddress = 'http://localhost:3000'
const utils={
    addBulkStudent: (fileContent)=>{
        let url=baseAddress + '/api/student/addBulkStudent'
        let token=Auth.getToken()
        let authString='bearer'+token
        let config={
            header:{
                'Authorization':authString
            }
        }
        axios.post(url,fileContent,config)
    }
}
export default utils
