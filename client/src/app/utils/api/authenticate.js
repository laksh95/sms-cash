import axios from 'axios';
import Auth from './../../Auth.js';
let serverAddress= 'http://localhost:3000';

 /**
  * @param
  *
  * @calls action on success or failure
  */

const utils = {

	login: (credential) => {
		let url = serverAddress + '/auth/login';
		return axios.post(url, credential);
	},

	check: () => {
		let token = Auth.getToken();
		let authString = 'bearer ' + token;
		let config = {
    		headers: {
        		'Authorization': authString
   	 		}
		}
		let url = serverAddress + '/api/check';
		return axios.get(url, config);
	}

}

export default utils;