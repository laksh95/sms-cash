const courseReducer = (state = {
    course : [],
    pagedCourses: []
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
    }
    return state
}
export default courseReducer