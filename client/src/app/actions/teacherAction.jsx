import teacher from '../utils/api/teacher.js';
import * as types from '../constants/index.js';

export function addUser(details){
	return {
		type: types.ADD_USER,
		payload:
			teacher.addUser(details)
			.then((response) => {
				return response.data;
      })
	}
}
