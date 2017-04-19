import * as types from './../constants'

const feedbackReducer = (
  state = {
    feedback: [],
    status: null,
    errorMessage: "no error"
  },
  action
) => {
  switch (action.type) {
    case "GET_FEEDBACK_FULFILLED":
    console.log("inside feedback reducer")
      let temporaryFeedbackStore = state.feedback
      temporaryFeedbackStore.push(action.payload.data)
      state = {
        ...state,
        status: 200,
        feedback: temporaryFeedbackStore
      }
      return state
    case "GET_FEEDBACK_REJECTED":
      let error = action.payload.response.data.message
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

export default feedbackReducer
