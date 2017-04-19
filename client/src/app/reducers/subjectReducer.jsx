import * as types from './../constants'

const subjectReducer = (
  state = {
    department: [],
    subject: [],
    status: 200,
    errorMessage: "Loading"
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
      let error = action.payload.data.message
      switch(error){
        case "IS_INTERNAL_SERVER_ERROR":
          state = {
            status: 500,
            errorMessage: messages.IS_INTERNAL_SERVER_ERROR
          }
          return state
        case "IS_INVALID_INPUT_FORM":
          state = {
            status: 400,
            errorMessage: messages.IS_INVALID_INPUT_FORM
          }
      }
    default:
      return state
  }
}

export default subjectReducer
