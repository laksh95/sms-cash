import axios from 'axios';
import Auth from './../../Auth.js';
let serverAddress= 'http://localhost:3000';

let configHeader= ()=> {
	let token = Auth.getToken();
	let authString = 'bearer ' + token;
	let config = {
		headers: {
    		'Authorization': authString
	 	}
	}
	return config;
}

const utils = {

	getDepartmentByCourse: (course) => {
		let url = serverAddress + '/api/department/getDepartments';
		let config= configHeader();
		return axios.post(url, course, config);
	},

	addDepartment: (department) => {
		let url = serverAddress + '/api/department/addDepartment';
		let config= configHeader();
		return axios.post(url, department, config);
	},

	deleteDepartment: (department) => {
		let url = serverAddress + '/api/department/deleteDepartment';
		let config= configHeader();
		return axios.put(url, department, config);
	},

	editDepartment: (department) => {
		let url = serverAddress + '/api/department/editDepartment';
		let config= configHeader();
		return axios.put(url, department, config);
	}
}

export default utils;

