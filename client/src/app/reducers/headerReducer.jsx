const adminReducer = ( state = {
	initialData : {
		"course":[],
		"batch":[]
	},
	selectedTab:"",
	selectedCourse:"Course",
	selectedSession:"Session",
	selectedCourseId: ""
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
		case "GET_SELECTED":
			state = {
				...state,
				selectedTab : action.payload
			}
			console.log(state.selectedTab);
			return state

		case "GET_INITIAL_DATA_FULFILLED":

            state = {
				...state,
				initialData: action.payload,
				selectedCourse: action.payload.course[0].name,
				selectedCourseId: action.payload.course[0].id
			}
			return state

		case "SET_CURRENT_SESSION":
		    state = {
		    	...state,
		    	selectedSession: action.payload
		    }
		    return state

    case "SET_CURRENT_COURSE":
         state = {
         	...state,
         	selectedCourse: action.payload.name,
					selectedCourseId: action.payload.id
         }
         return state

		default:
			return state
	}
}

export default adminReducer
