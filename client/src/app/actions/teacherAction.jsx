import teacher from '../utils/api/teacher.js';
import * as types from '../constants/index.js';

export function addUser(details){
	return {
		type: types.ADD_USER_TEACHER,
		payload:
			teacher.addUser(details)
			.then((response) => {
				return response.data;
      })
	}
}

export function getTeacher(){
	return {
		type: types.GET_TEACHER,
		payload:
			teacher.getTeacher()
			.then((response) => {
				return response.data
			})
	}
}

export function changeDetails(details){
	return {
		type: types.CHANGE_DETAILS,
		payload:
			teacher.changeDetails(details)
			.then((response) => {
				return response.data
			})
	}
}

export function deleteTeacher(teacherId){
	return {
		type: types.DELETE_TEACHER,
		payload:
			teacher.deleteTeacher(teacherId)
			.then((response) => {
				return response.data
			})
	}
}

export function approveDetails(teacherId) {
	return {
		type: types.APPROVE_TEACHER,
		payload:
			teacher.approveDetails(teacherId)
			.then((response) => {
				return response.data
			})
	}

}
