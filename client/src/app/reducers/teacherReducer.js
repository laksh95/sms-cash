import * as codes from './../constants/responseMessageCodes.js'

const teacherReducer = (
  state = {
    email: null,
    password: null,
    userId: null,
    status: 200,
    errorMessage: "Loading",
    allTeacher: [],
    showErrorPage: false
  },
  action
) => {
  switch (action.type) {
    case "ADD_USER_TEACHER_FULFILLED":
      state = {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        userId: action.payload.userId
      }
      return state
    case "GET_TEACHER_FULFILLED":
      state = {
        ...state,
        allTeacher: action.payload.allTeacher
      }
      return state
    case "CHANGE_DETAILS_FULFILLED":
      state = {
        ...state,
        allTeacher: action.payload.allTeacher
      }
      return state
    case "DELETE_TEACHER_FULFILLED":
      let allTeacher = state.allTeacher
      for(let index = 0; index < allTeacher.length; index++){
        if(allTeacher[index.id === action.payload.teacher.id])
        {
          allTeacher.splice(index,1)
        }
      }
      state = {
        ...state,
        allTeacher: allTeacher
      }
      return state
    case "APPROVE_TEACHER_FULFILLED":
      let allTeacherStored = state.allTeacher
      for(let index = 0; index < allTeacherStored.length; index++){
        if(allTeacherStored[index.id === action.payload.teacher.id])
        {
          allTeacherStored[index].adminApproved = true
        }
      }
      state = {
        ...state,
        allTeacher: allTeacherStored
      }
    case "APPROVE_TEACHER_REJECTED":

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
