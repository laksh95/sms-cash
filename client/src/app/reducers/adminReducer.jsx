const adminReducer = ( state = {
	allDepartments: [],
	allSessions: [],
	allBatches: [],
	allCourses: []
} , action) => {
	switch (action.type){
		case "GET_DEPARTMENTS":
			state = {
				...state,            //creating state containing all departments, courses, batches and sessions
				allDepartments: action.payload
			}
			return state
		case "GET_COURSES_FULFILLED":
			state = {
				...state,
				allCourses: action.payload
			}
			return state
		case "GET_BATCHES":
			state = {
				...state,
				allBatches: action.payload
			}
			return state
		case "GET_SESSIONS":
			state = {
				...state,
				allSessions: action.payload
			}
			return state
		default:
			return state
	}
}

export default adminReducer
