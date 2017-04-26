import subject from '../utils/api/subject.js';
import * as types from '../constants/index.js';

export function getSubjectAndDepartment(data){
	return {
		type: types.GET_SUBJECT_AND_DEPARTMENT,
		payload:
			subject.getSubjectAndDepartment(data)
			.then((response) => {
				response.data.status= response.status
				return response.data
			})
	}
}

export function resetToNoErrorSubject(){
    return {
        type: types.RESET_ERROR_SUBJECT
    }
}
