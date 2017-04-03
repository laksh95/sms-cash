import authenticate from './../utils/api/authenticate';
import * as types from './../constants';



export function getInitialData(config){

	return {
		type: types.GET_INITIAL_DATA,
		payload: 	
			authenticate.getInitialData(config)
			.then((response) => {
				return response.data;
			})
	};
	
}



export function setCurrentSession(session){
	return {
		type: types.SET_CURRENT_SESSION,
		payload: session
	};
	
}


export function setCurrentCourse(course){
    console.log(course + '-----------------------------------------------------------------');
	return {
		type: types.SET_CURRENT_COURSE,
		payload: course
	};
	
}