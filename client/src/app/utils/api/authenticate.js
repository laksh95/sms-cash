import axios from 'axios';
let serverAddress= 'http://localhost:8084';

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

	check: (config) => {
		let url = serverAddress + '/api/check';
		return axios.get(url, config);
	}

}

export default utils;