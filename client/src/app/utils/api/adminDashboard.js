import axios from 'axios';
import serverAddress from '../../constants'
const utils = {
	getData: (userId) => {
		let url = serverAddress + '/api/academicCalendar/dashboard/getInitialData';
		return axios.post(url, userId);
	},
	addToCalendar:(type,method,event)=>{
		let url = serverAddress + '/api/'+type+'/dashboard/'+method;
		return axios.post(url, event);
	},
	deletefromCalendar:(type,method,id)=>{
		let url = serverAddress + '/api/'+type+'/dashboard/'+method;
		return axios.post(url, id);
	}
}
export default utils;