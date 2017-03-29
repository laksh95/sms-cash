import authenticate from './../utils/api/authenticate';
import * as types from './../constants';

export function loginUser(credential){

	return {
		type: types.LOGIN,
		payload: 	
			authenticate.login(credential)
			.then((response) => {
				return response.data;
			})
	};
	
}


export function checkLogin(config){

	return {
		type: types.CHECK_IS_LOGIN,
		payload: 	
			authenticate.check(config)
			.then((response) => {
				return response.data;
			})
	};
	
}

export function logoutUser(){
	return{
		type: types.LOGOUT
	}
}
