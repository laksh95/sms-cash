import * as codes from './../constants/responseMessageCodes.js'

const teacherReducer = (
  state = {
    status: 200,
    errorMessage: "no error",
    allTeacher: []
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
      let error = action.payload.response.data.message
      console.log(error)
      switch(error){
        case "IS_INTERNAL_SERVER_ERROR":
          state = {
            status: 500,
            errorMessage: codes.failure.IS_INTERNAL_SERVER_ERROR
          }
          return state
        case "IS_INVALID_INPUT_FORM":
          state = {
            status: 400,
            errorMessage: codes.failure.IS_INVALID_INPUT_FORM
          }
      }
    default:
      return state
  }
}

export default teacherReducer
