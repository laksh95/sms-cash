import axios from 'axios';
export function getParentCount(count){
	return{
		type : "GET_PARENT_COUNT",
		payload:count
  	};
}
export function getStudentCount(count){
	return{
		type:"GET_STUDENT_COUNT",
		payload:count
	};
}
export function getTeacherCount(count){
	return{
		type:"GET_TEACHER_COUNT",
		payload:count
	};
}
export function getEvents(events){
	return{
		type:"GET_EVENTS",
		payload:events
	};
}