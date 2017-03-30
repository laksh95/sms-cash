const teacherReducer = (
  state = {
    email: null,
    password: null,
    userId: null
  },
  action
) => {
  switch (action.type) {
    case ADD_USER:
      state = {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        userId: action.payload.userId
      }
      break
    default:
      return state

  }
}
