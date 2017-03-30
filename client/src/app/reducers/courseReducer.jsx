const courseReducer = (state = {
    course : [],
    pagedCourses: [],
    snackbarOpen:"",
    snackbarMessage:"",
    value : "a",
    totalPages : "",
    currentPage : ""

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
        case "GET_COURSES" :
            let course  = action.payload
            let size = course.length
            let pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            state  = {
                ...state ,
                course : course ,
                totalPages : size ,
                pagedCourses : pagedCourses
            }
            break
        case "ADD_COURSE":
            let data = action.payload
            if(data.status==1){
                let newCourse = data.content
                let course = state.course
                course.push(newCourse)
                let size = course.length
                let pagedCourses = []
                for(let index  in course){
                    if(index<10){
                        pagedCourses.push(course[index])
                    }
                }
                state = {
                    ...state ,
                    course : course ,
                    snackbarOpen : true,
                    snackbarMessage : "Course Added",
                    value : 'a',
                    totalPages : size ,
                    currentPage : 1,
                    pagedCourses : pagedCourses
                }
            }
            else {
                state = {
                    ...state ,
                    snackbarMessage : data.content,
                    snackbarOpen : true
                }
            }
            break
        case "EDIT_COURSE":
            let data = action.payload
            if(data[0]==1){
                let course = state.course
                for(let index in course){
                    if(course[index].id===data.id){
                        course[index] = data
                    }
                }
                let size = course.length
                let pagedCourses = []
                for(let index in course){
                    if(index<10){
                        pagedCourses.push(course[index])
                    }
                }
                state = {
                    ...state ,
                    course  : course ,
                    totalPages : size ,
                    currentPage : 1 ,
                    pagedCourses:pagedCourses ,
                    snackbarMessage : "Field Edited Successfully",
                    snackbarOpen : true
                }
            }
            else {
                this.props.setSnackbarMessage("Internal Server Error")
                this.props.setSnackbarOpen(true)
                state = {
                    ...state ,
                    snackbarMessage : "Internal Server Error",
                    snackbarOpen : true
                }
            }

            break
        case "DELETE_COURSE":
            let course = state.course
            for(let index in course){
                if(course[index].id==data.id){
                    course.splice(index,1)
                }
            }
            let size=course.length
            let pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            state = {
                ...state ,
                course : course ,
                totalPages : size ,
                currentPage: 1,
                snackbarOpen :true ,
                snackbarMessage : "Course Deleted",
                pagedCourses:pagedCourses
            }
            break
    }
    return state
}
export default courseReducer