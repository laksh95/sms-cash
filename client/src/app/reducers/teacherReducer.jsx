const teacherReducer = (
  state = {
    email: null,
    password: null,
    userId: null,
    allTeacher: []
  },
  action
) => {
  switch (action.type) {
    case "ADD_USER_FULFILLED":
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
    

    default:
      return state
  }

}
