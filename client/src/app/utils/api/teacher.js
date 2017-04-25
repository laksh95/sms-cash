import axios from 'axios';
import Auth from './../../Auth.js';
let serverAddress= 'http://localhost:3000';

const utils = {
	getTeacherAndFeedback: (data) => {
		let url = serverAddress + '/api/teacher/getTeacherAndFeedback'
		let token = Auth.getToken();
		let authString = 'bearer ' + token
		let config = {
    		headers: {
        		'Authorization': authString
   	 		}
		}
		return axios.post(url, data, config);
	},
	getTeacher: (courseDetails) => {
		let url = serverAddress + '/api/teacher/fetchTeacherByCourseId'
		let token = Auth.getToken();
		let authString = 'bearer ' + token
		let config = {
    		headers: {
        		'Authorization': authString
   	 		}
		}
		return axios.post(url, courseDetails, config);
	},
	changeDetails: (details) => {
		let url = serverAddress + '/api/teacher/changeDetails'
		let token = Auth.getToken();
		let authString = 'bearer ' + token
		let config = {
    		headers: {
        		'Authorization': authString
   	 		}
		}
		return axios.post(url, details, config);
	},
	deleteTeacher: (teacherId) => {
		let url = serverAddress + '/api/teacher/deleteTeacher'
		let token = Auth.getToken();
		let authString = 'bearer ' + token
		let config = {
    		headers: {
        		'Authorization': authString
   	 		}
		}
		return axios.post(url, teacherId, config);
	},
	approveDetails: (teacherId) => {
		let url = serverAddress + '/api/teacher/approveDetails'
		let token = Auth.getToken();
		let authString = 'bearer ' + token
		let config = {
    		headers: {
        		'Authorization': authString
   	 		}
		}
		return axios.post(url, teacherId, config);
	}
}

export default utils
