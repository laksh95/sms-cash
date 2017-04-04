import departmentApi from './../utils/api/department';
import * as types from './../constants';

export function getDepartmentList(course){
	return {
		type: types.GET_ALL_DEPARTMENT_FOR_COURSE,
		payload: 	
			departmentApi.getDepartmentByCourse(course)
			.then((response) => {
				return response.data;
			})
	};
	
}

export function addDepartment(department){
	return {
		type: types.ADD_DEPARTMENT,
		payload: 	
			departmentApi.addDepartment(department)
			.then((response) => {
				return response.data;
			})
	};
	
}

export function deleteDepartment(department){
	return {
		type: types.DELETE_DEPARTMENT,
		payload: 	
			departmentApi.deleteDepartment(department)
			.then((response) => {
				return response.data;
			})
	};
	
}

export function editDepartment(department){
	return {
		type: types.EDIT_DEPARTMENT,
		payload: 	
			departmentApi.editDepartment(department)
			.then((response) => {
			return response.data;
			})
	};
	
}


export function hideSlackBar(){
	return {
		type: types.HIDE_SLACKBAR
	};
}

export function updateSlackBarMsg(message){
	return {
		type: types.CHANGE_SLACKBAR_MSG,
		payload: message
	};
	
}

export function handleTabChange(value) {
	return {
		type: types.HANDLE_TAB_CHANGE,
		payload: value
	};
}


export function pageChange(currentPage , size) {
	return {
		type: types.PAGE_CHANGE,
		payload: currentPage
	};
}







