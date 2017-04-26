import teacher from '../utils/api/teacher.js';
import * as types from '../constants/index.js';

export function getTeacherAndFeedback(data){
	return {
		type: types.GET_TEACHER_AND_FEEDBACK,
		payload:
			teacher.getTeacherAndFeedback(data)
			.then((response) => {
				response.data.status= response.status
				return response.data
			})
	}
}

export function resetToNoErrorTeacher(){
    return {
        type: types.RESET_ERROR
    }
}
