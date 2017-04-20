const courseReducer = (state = {
    course : [],
    pagedCourses: [],
    snackbarOpen:"",
    snackbarMessage:"",
    value : "a",
    totalPages : "",
    currentPage : 1,
    showErrorPage: false,
    errorMessage: ""
},action) => {
    switch(action.type){
        case "SET_COURSE":
            state = {
                ...state ,
                course : action.payload
            }
            break
        case "SET_PAGED_COURSES":
            state = {
                ...state ,
                pagedCourses:action.payload
            }
            break
        case "SET_SNACKBAR_OPEN":
            state ={
                ...state ,
                snackbarOpen:action.payload
            }
            break
        case "SET_SNACKBAR_MESSAGE":
            state ={
                ...state ,
                snackbarMessage : action.payload
            }
            break
        case "SET_VALUE":
            state = {
                ...state,
                value : action.payload
            }
            break
        case "GET_COURSES_FULFILLED" :
            var course  = action.payload.data
            var size = course.length
            var pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            if(0==pagedCourses){
                state = {
                    ...state ,
                    snackbarMessage : "Nothing to Show",
                    snackbarOpen : true
                }
            }
            state  = {
                ...state ,
                course : course ,
                totalPages : size ,
                pagedCourses : pagedCourses
            }
            break
        case "GET_COURSES_REJECTED":
            var data= action.payload.response
            if(data.status===400){
                state ={
                    ...state ,
                    snackbarMessage : "BAD REQUEST",
                    snackbarOpen : true
                }
            }
            else if (data.status===500){
                state = {
                    ...state ,
                    showErrorPage : true,
                    errorMessage : "500 : Internal Server Error"
                }
            }
            break
        case "ADD_COURSE_FULFILLED":
            var data = action.payload
            if(data.status===200){
                let newCourse = data.data
                let course = state.course
                course.push(newCourse)
                var size = course.length
                var pagedCourses = []
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
                    showErrorPage : true,
                    errorMessage : "500 : Internal Server Error"
                }
            }
            break
        case "ADD_COURSE_REJECTED":
            var data = action.payload.response
            if (data.status===500){
                state={
                    ...state ,
                    showErrorPage:true ,
                    errorMessage :"500:Internal Server Error"
                }
            }
            else if(data.status===400){
                console.log(data.data.msg)
                if(data.data.msg=='COURSE_ALREADY_EXISTS')
                    state ={
                        ...state ,
                        snackbarMessage :"Course Already Exists",
                        snackbarOpen : true
                    }
                else{
                    state= {
                        ...state ,
                        snackbarMessage :"BAD REQUEST",
                        snackbarOpen : true
                    }
                }
            }
            else if (data.status===403){
                state = {
                    ...state ,
                    showErrorPage : true ,
                    errorMessage : "403: Forbidden"
                }
            }
            break
        case "EDIT_COURSE_FULFILLED":
            var content = action.payload
            var data = content.data
            if(content.status==200){
                let course = state.course
                for(let index in course){
                    if(course[index].id===data.id){
                        course[index] = data
                    }
                }
                var size = course.length
                var pagedCourses = []
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

        case "EDIT_COURSE_REJECTED":
            var data = action.payload.response
            if (data.status===500){
                state={
                    ...state ,
                    showErrorPage:true ,
                    errorMessage :"500:Internal Server Error"
                }
            }
            else if(data.status===400){
                console.log(data.data.msg)
                state= {
                    ...state ,
                    snackbarMessage :"BAD REQUEST",
                    snackbarOpen : true
                }
            }
            else if (data.status===403){
                state = {
                    ...state ,
                    showErrorPage : true ,
                    errorMessage : "403: Forbidden"
                }
            }
            break

        case "DELETE_COURSE_FULFILLED":
            var course = state.course
            var data = action.payload.data
            console.log(course)
            console.log(data)
            for(let index in course){
                if(course[index].id==data){
                    console.log("true")
                    course.splice(index,1)
                }
            }
            var size = course.length
            var pagedCourses = []
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
        case "DELETE_COURSE_REJECTED":
            var data = action.payload.response
            if (data.status===500){
                state={
                    ...state ,
                    showErrorPage:true ,
                    errorMessage :"500:Internal Server Error"
                }
            }
            else if(data.status===400){
                console.log(data.data.msg)
                state= {
                    ...state ,
                    snackbarMessage :"BAD REQUEST",
                    snackbarOpen : true
                }
            }
            else if (data.status===403){
                state = {
                    ...state ,
                    showErrorPage : true ,
                    errorMessage : "403: Forbidden"
                }
            }
            break
        case "SET_PAGINATION":
            var data = action.payload
            var pagedCourses = data.pagedCourses
            var currentPage = data.currentPage
            state = {
                ...state ,
                pagedCourses ,
                currentPage
            }
            break
        case "RESET_ERROR":
            state={
                ...state,
                showErrorPage: false,
                errorMessage: ""
            }
            break
    }
    return state
}
export default courseReducer
