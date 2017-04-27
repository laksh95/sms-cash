const adminReducer = ( state = {
	initialData : {
		"course":[],
		"batch":[]
	},
	selectedTab:"",
	selectedCourse:"Course",
	selectedSession:"Session",
	selectedCourseId: localStorage.getItem("courseId") 
} , action) => {
	switch (action.type){

		case "UPDATE_COURSE":
		    console.log(action.payload);
		    console.log(state.initialData.course)
		    if (state.initialData.course.filter(e => e.name == action.payload).length > 0) {
              	console.log("InInsid")
                let a =initialData =state.initialData.course.splice( state.initialData.course.findIndex(x => x.name==action.payload), 1);
		        state={
		     	...state,
		     	initialData: {
                    "course": a,
		     		"batch": state.initialData.batch
		     	}
		      }
            }
		    
		    return state
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
		let courseIdOld = JSON.parse(localStorage.getItem("courseId"))
		let courseId = ""
		let courseName = ""
		if(courseIdOld === undefined || courseIdOld === null){
			courseId = action.payload.course[0].id
			courseName = action.payload.course[0].name
		}
		else{
			for(let index =0 ; index<action.payload.course.length ; index ++){
				if(action.payload.course[index].id == courseIdOld)
				{
					courseName = action.payload.course[index].name
					courseId = courseIdOld
				}
			}
		}

        state = {
				...state,
				initialData: action.payload,
				selectedCourse: courseName,
				selectedCourseId: courseId
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
				 localStorage.setItem("courseId",action.payload.id)
         return state

		default:
			return state
	}
}

export default adminReducer
