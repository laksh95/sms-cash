import axios from 'axios';
import {serverAddress} from '../../constants'
import Auth from './../../Auth.js';

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
	getData: (userId) => {
		console.log("server---->",serverAddress)
		let url = serverAddress + '/api/academicCalendar/dashboard/getInitialData';
		let config= configHeader();
		return axios.post(url, userId,config);
	},
	addToCalendar:(type,method,event)=>{
		let url = serverAddress + '/api/'+type+'/dashboard/'+method;
		let config= configHeader();
		return axios.post(url, event,config);
	},
	deletefromCalendar:(type,method,id)=>{
		let url = serverAddress + '/api/'+type+'/dashboard/'+method;
		let config= configHeader();
		return axios.post(url, id,config);
	}
}
export default utils;