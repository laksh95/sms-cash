import * as codes from './../constants/responseMessageCodes.js'

const teacherReducer = (
  state = {
    status: 200,
    errorMessage: "Loading",
    allTeacher: [],
    allTeacherAndFeedback: [],
    showErrorPage: false,
    error: false,
    noDataError: false,
    pagedTeachers: [],
    currentPage: 1,
    totalPages : 0,
    successSnackBar: false,
    changeDetailSuccess: false,
    deleteSuccess: false,
    actionSuccessSnack: false,
    approveDetailsSuccess: false
  },
  action
) => {
  let errorStatus
  let allTeacher
  switch (action.type) {
    /*adding the teacher to database*/
    case "ADD_USER_TEACHER_FULFILLED":
      allTeacher = state.allTeacher
      let newTeacher = action.payload.data
      newTeacher.teacher_name = action.payload.result.name
      newTeacher.teacher_email = action.payload.result.emailId
      allTeacher.push(newTeacher)
      state = {
        ...state,
        allTeacher: allTeacher,
        error: false,
        errorMessage: action.payload.message,
        noDataError: false,
        successSnackBar: true,
        value: "1"
      }
      return state
    case "ADD_USER_TEACHER_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            ...state,
            error: true,
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error",
            successSnackBar: false
          }
          return state
        case 400:
          state = {
            ...state,
            error: true,
            status: 400,
            errorMessage: "BAD REQUEST",
            successSnackBar: false
          }
          return state
        case 403:
          state = {
              ...state ,
              error: true,
              showErrorPage : true,
              errorMessage : "403: Forbidden",
              successSnackBar: false
          }
          return state
        default:
          return state
      }
    /*getting teacher list as per the course selected*/
    case "GET_TEACHER_FULFILLED":
      state = {
        ...state,
        allTeacher: action.payload.result,
        errorMessage: action.payload.message,
        error: false,
        noDataError: false
      }
      if(action.payload.message == "NO_ROWS_FOUND"){
        state = {
          ...state,
          status: 200,
          allTeacher: action.payload.data,
          errorMessage: action.payload.message,
          noDataError: true
        }
      }
      return state
      return state
    case "GET_TEACHER_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            ...state,
            error: true,
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            ...state,
            error: true,
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
              ...state ,
              error: true,
              showErrorPage : true,
              errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    /*changing the details of the teacher*/
    case "CHANGE_DETAILS_FULFILLED":
      allTeacher = state.allTeacher
      let result = action.payload.result
      for(let index = 0; index < allTeacher.length; index++){
        if(allTeacher[index].id === result.teacherId){
          allTeacher[index].department_id = result.department
          allTeacher[index].department_name = result.departmentName
          allTeacher[index].designation = result.designation
          allTeacher[index].joining_date = new Date(result.joinDate)
          allTeacher[index].teacher_email = result.email
          allTeacher[index].teacher_name = result.name
          break
        }
      }
      state = {
        ...state,
        allTeacher: allTeacher,
        changeDetailSuccess: true,
        actionSuccessSnack: true,
        error: false
      }
      return state
    case "CHANGE_DETAILS_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            ...state,
            error: true,
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            ...state,
            error: true,
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
              ...state ,
              error: true,
              showErrorPage : true,
              errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    /*deleting teachers*/
    case "DELETE_TEACHER_FULFILLED":
      allTeacher = state.allTeacher
      let isTeacherListEmptyError = false
      let message = "Loading"
      for(let index = 0; index < allTeacher.length; index++){
        if(allTeacher[index].id === action.payload.teacher)
        {
          allTeacher.splice(index,1)
        }
      }
      if(allTeacher.length == 0){
        isTeacherListEmptyError = true
        message = "No records found"
      }
      state = {
        ...state,
        error: isTeacherListEmptyError,
        allTeacher: allTeacher,
        errorMessage: message,
        deleteSuccess: true,
        actionSuccessSnack: true,
        error: false
      }
      return state
    case "DELETE_TEACHER_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            ...state,
            error: true,
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            ...state,
            error: true,
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
              ...state ,
              error: true,
              showErrorPage : true,
              errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    /*approving the teacher's addition to the system*/
    case "APPROVE_TEACHER_FULFILLED":
      let allTeacherStored = state.allTeacher
      for(let index = 0; index < allTeacherStored.length; index++){
        if(allTeacherStored[index].id === action.payload.teacher)
        {
          allTeacherStored[index].approved = true
        }
      }
      state = {
        ...state,
        allTeacher: allTeacherStored,
        actionSuccessSnack: true,
        approveDetailsSuccess: true,
        error: false
      }
      return state
    case "APPROVE_TEACHER_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
              ...state ,
              showErrorPage : true,
              errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    /*getting teacher as per the course selected and their respective feedbacks(used in feedback module)*/
    case "GET_TEACHER_AND_FEEDBACK_FULFILLED":
      state = {
        ...state,
        status: 200,
        allTeacherAndFeedback: action.payload.data,
        errorMessage: action.payload.message,
        error: false,
        noDataError: false
      }
      if(action.payload.message == "NO_ROWS_FOUND"){
        state = {
          ...state,
          status: 200,
          allTeacherAndFeedback: action.payload.data,
          errorMessage: action.payload.message,
          error: true,
          noDataError: true
        }
      }
      return state
    case "GET_TEACHER_AND_FEEDBACK_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            ...state,
            error: true,
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            ...state,
            error: true,
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
              ...state ,
              error: true,
              showErrorPage : true,
              errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    case "SET_PAGINATION_TEACHER":
        var data = action.payload
        var pagedTeachers = data.pagedTeachers
        var currentPage = data.currentPage
        state = {
            ...state ,
            pagedTeachers ,
            currentPage
        }
        break
    /*resets the error page to false so that the error page does not open for every case*/
    case "RESET_ERROR_TEACHER":
        state={
            ...state,
            showErrorPage: false,
            errorMessage: "Loading",
            error: false,
            status: 200,
            noDataError: false,
            successSnackBar: false,
            changeDetailSuccess: false,
            deleteSuccess: false,
            actionSuccessSnack: false,
            approveDetailsSuccess: false
        }
        return state
    case "SET_VALUE":
        state = {
            ...state,
            value : action.payload
        }
        return state
    default:
      return state
  }
}

export default teacherReducer
