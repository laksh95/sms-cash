import adminDashboard from './../utils/api/adminDashboard';
import {GET_INITIAL_DATA_DASHBOARD,DELETE_fROM_CALENDER,ADD_TO_CALENDER,SET_SNACK} from './../constants';
export function getInitialData(userId){
	return{
		type: GET_INITIAL_DATA_DASHBOARD ,
		payload:adminDashboard.getData(userId).then((response) => {
				response.data.data.status=response.status;
				return response.data.data;
			})
  	};
}
export function addToCalendar(type,method,event){
	console.log("inside addtocalendar")
	return{
		type: ADD_TO_CALENDER ,
		payload:adminDashboard.addToCalendar(type,method,event).then((response) => {
				response.data.data.status=response.status;
				response.data.data.type=type;
				response.data.data.method=method;
				return response.data.data;
			})
  	};
}
export function deleteFromCalendar(type,method,id){
	return{
		type: DELETE_fROM_CALENDER ,
		payload:adminDashboard.deletefromCalendar(type,method,id).then((response) => {
				response.data.data.status=response.status;
				response.data.data.type=type;
				response.data.data.method=method;				
				return response.data.data;
			})
  	};
}
export function setSnack(data,message){
	return{
		type: SET_SNACK ,
		payload:{
			data:data,
			message:message
		}
  	};
}

