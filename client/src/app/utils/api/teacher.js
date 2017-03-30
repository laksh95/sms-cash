import axios from 'axios';
let serverAddress= 'http://localhost:3000';

const utils = {
	addUser: (details) => {
		let url = serverAddress + '/api/teacher';
		return axios.post(url, detail);
	}
}

export default utils;
