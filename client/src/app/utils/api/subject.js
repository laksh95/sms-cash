import axios from 'axios';
import Auth from './../../Auth.js';
import {serverAddress} from '../../constants'

const utils = {
	getSubjectAndDepartment: (data) => {
		let url = serverAddress + '/api/subject/getSubjectAndDepartment'
		let token = Auth.getToken();
		let authString = 'bearer ' + token
		let config = {
    		headers: {
        		'Authorization': authString
   	 		}
		}
		return axios.post(url, data, config);
	}
}

export default utils;
