import * as types from './../constants'

const subjectReducer = (
  state = {
    department: [],
    subject: [],
    status: 200,
    errorMessage: "Loading",
    showErrorPage: false,
    error: false
  },
  action
) => {
  switch (action.type) {
    case "GET_SUBJECT_AND_DEPARTMENT_FULFILLED":
      state = {
        ...state,
        status: 200,
        department: action.payload.data.department,
        subject: action.payload.data.subject,
        errorMessage: action.payload.message
      }
      return state
    case "GET_SUBJECT_AND_DEPARTMENT_REJECTED":
      let errorStatus = action.payload.response.status
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
      }
      case "RESET_ERROR":
          state={
              ...state,
              showErrorPage: false,
              errorMessage: "Loading"
          }
          return state
    default:
      return state
  }
}

export default subjectReducer
