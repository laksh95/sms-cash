const blogReducer = ( state = {
    open : false,
    posts : [],
    post : {},
    comments : []
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
        case "GET_POST_FULFILLED":
            state = {
                ...state ,
                post :action.payload.data,
                comments :action.payload.data.comments
            }
            return state
        default:
            return state
    }
}

export default blogReducer
