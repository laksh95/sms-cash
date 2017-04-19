import adminDashboard from './../utils/api/adminDashboard';
import {GET_INITIAL_DATA,DELETE_fROM_CALENDER,ADD_TO_CALENDER,SET_SNACK} from './../constants';
export function getInitialData(userId){
	return{
		type: GET_INITIAL_DATA ,
		payload:adminDashboard.getData(userId).then((response) => {
				return response.data;
			})
  	};
}
export function addToCalendar(type,method,event){
	return{
		type: ADD_TO_CALENDER ,
		payload:adminDashboard.addToCalendar(type,method,event).then((response) => {
				return response.data;
			})
  	};
}
export function deleteFromCalendar(type,method,id){
	return{
		type: DELETE_FROM_CALENDER ,
		payload:adminDashboard.deletefromCalendar(type,method,id).then((response) => {
				return response.data;
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

