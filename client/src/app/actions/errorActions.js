import * as types from './../constants';


export function setErrorMessage(message){
	return {
		type: types.SET_ERROR_MESSAGE,
		payload: message
	}
}