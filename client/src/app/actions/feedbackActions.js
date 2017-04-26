import feedback from '../utils/api/feedback.js';
import * as types from '../constants/index.js';

export function getFeedback(data){
	return {
		type: types.GET_FEEDBACK,
		payload:
			feedback.getFeedback(data)
			.then((response) => {
				return response.data
			})
	}
}
