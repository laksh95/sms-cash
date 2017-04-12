const blogReducer = ( state = {
    open : false,
    posts : []
} , action) => {
    switch (action.type){
        case "OPEN_MODAL":
            state = {
                ...state,
                open : action.payload
            }
            return state
        case "GET_POSTS_FULFILLED":
            state = {
                ...state,
                posts : action.payload.data
            }
            return state
        default:
            return state
    }
}

export default blogReducer
