import * as codes from './../constants/responseMessageCodes.js'

const teacherReducer = (
  state = {
    status: 200,
    errorMessage: "Loading",
    allTeacher: [],
    showErrorPage: false
  },
  action
) => {
  switch (action.type) {
    case "GET_TEACHER_AND_FEEDBACK_FULFILLED":
      state = {
        ...state,
        status: 200,
        allTeacher: action.payload.data,
        errorMessage: action.payload.message
      }
      return state
    case "GET_TEACHER_AND_FEEDBACK_REJECTED":
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

export default teacherReducer
