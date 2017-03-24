const courseReducer = (state = {
    course : [],
    pagedCourses: [],
    snackbarOpen:"",
    snackbarMessage:"",
    value : "a"
},action) => {
    switch(action.type){
        case "setCourse":
            state = {
                ...state ,
                course : action.payload
            }
            break
        case "setPagedCourse":
            state = {
                ...state ,
                pagedCourses:action.payload
            }
            break
        case "setSnackbarOpen":
            state ={
                ...state ,
                snackbarOpen:action.payload
            }
            break
        case "setSnackbarMessage":
            state ={
                ...state ,
                snackbarMessage : action.payload
            }
            break
        case "setValue":
            state = {
                ...state,
                value : action.payload
            }
            break
    }
    return state
}
export default courseReducer