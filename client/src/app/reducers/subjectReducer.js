import * as types from './../constants'

const subjectReducer = (
  state = {
    department: [],
    subject: [],
    status: 200,
    errorMessage: "Loading",
    showErrorPage: false,
    error: false,
    errorDepartment: false,
    errorSubject: false
  },
  action
) => {
  switch (action.type) {
    case "GET_SUBJECT_AND_DEPARTMENT_FULFILLED":
      let noDataError = false
      let noDataErrorSubject = false
      let noDataMessage = "Done"
      if(action.payload.data.subject.length == 0){
        noDataErrorSubject = true
      }
      if(action.payload.data.department.length == 0){
        noDataError = true
      }
      state = {
        ...state,
        status: 200,
        department: action.payload.data.department,
        subject: action.payload.data.subject,
        errorSubject: noDataErrorSubject,
        errorDepartment: noDataError
      }
      return state
    case "GET_SUBJECT_AND_DEPARTMENT_REJECTED":
      let errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error",
            error: true
          }
          return state
        case 400:
          state = {
            status: 400,
            errorMessage: "BAD REQUEST",
            error: true
          }
          return state
        case 403:
          state = {
              ...state ,
              showErrorPage : true,
              errorMessage : "403: Forbidden",
              error: true
          }
          return state
      }
      case "RESET_ERROR":
          state={
              ...state,
              showErrorPage: false,
              errorMessage: "Loading",
              error: false,
              status: 200,
              errorDepartment: false,
              errorSubject: false
          }
          return state
    default:
      return state
  }
}

export default subjectReducer
