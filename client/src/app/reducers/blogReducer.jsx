const blogReducer = ( state = {
    open : false,
    posts : [],
    post : {},
    comments : [],
    username : "admin"
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
        case "ADD_COMMENT_FULFILLED":
            let comment = action.payload.data
            comment.user_name = state.username
            let comments = state.comments
            comments.push(comment)
            state = {
                ...state ,
                comments
            }
            return state
        case "EDIT_COMMENT_FULFILLED":
            var comment = action.payload.data
            var comments = state.comments
            for(let index in comments){
                if(comments[index].id == comment.id)
                    comments[index].content = comment.content
            }
            state = {
                ...state ,
                comments
            }
            return state
        default:
            return state
    }
}
export default blogReducer