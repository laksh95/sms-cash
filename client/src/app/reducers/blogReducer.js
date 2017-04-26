const blogReducer = (state = {
    open : false,
    posts : [],
    post : {},
    comments : [],
    username : "admin",
    userId : 1,
    stats :{},
    showEdit : false,
    snackbarOpen:false,
    snackbarMessage:"",
    showErrorPage: false,
    errorMessage: "",
    commentPageNumber :2,
    moreComments : true,
    isScrollActive : true
} , action) => {
    switch (action.type){
        case "OPEN_MODAL":
            state = {
                ...state,
                open : action.payload
            }
            return state
        case "GET_POSTS_FULFILLED":
            if(action.payload.data.length===0){
                state = {
                    ...state,
                    isScrollActive: false
                }
            }
            else {
                var posts = state.posts
                posts = posts.concat(action.payload.data)
                state = {
                    ...state,
                    posts
                }
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
            let temp = []
            temp.push(comment)
            let comments = state.comments
            // comments.push(comment)
            comments = temp.concat(comments)
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
        case "DELETE_COMMENT_FULFILLED":
            var comment = action.payload.data
            var comments = state.comments
            for(let index in comments){
                if(comments[index].id == comment.id){
                    comments.splice(index,1)
                }
            }
            state = {
                ...state ,
                comments
            }
            return state
        case "ADD_POST_FULFILLED":
            var post = action.payload.data
            var posts = state.posts
            posts.push(post)
            state = {
                ...state ,
                open : false,
                posts :posts
            }
            return state
        case "GET_STATS_FULFILLED":
            var data= action.payload.data
            console.log("========",data)
            state = {
                ...state ,
                stats : data
            }
            return state
        case "SET_POST":
            var data = action.payload
            state= {
                ...state ,
                post : data
            }
            return state
        case "DELETE_POST_FULFILLED":
            var post= state.post
            var posts = state.posts
            for(let index in posts){
                if(posts[index].id ==post.id) {
                    posts.splice(index,1)
                }
            }
            state = {
                ...state ,
                posts: posts
            }
            return state
        case "SET_SHOW_EDIT":
            state = {
                ...state ,
                showEdit : action.payload
            }
            return state
        case "SET_CURRENT_LIKE":
            let post = state.post
            post.liked= action.payload.liked
            post.likes=action.payload.likes
            state = {
                ...state ,
                post
            }
            return state
        case "SET_LIKES":
            return state
        case "SEARCH_POST_FULFILLED":
            let posts = action.payload.data
            if(posts.length===0){
                state ={
                    ...state,
                    posts,
                    snackbarOpen:true,
                    snackbarMessage:"Not Found"
                }
            }
            else{
                state ={
                    ...state,
                    posts
                }
            }
            return state
        case "SET_SNACKBAR_OPEN":
            state ={
                ...state ,
                snackbarOpen:action.payload
            }
            return state
        case "GET_COMMENTS_FULFILLED":
            let c = state.commentPageNumber
            let newComments = action.payload.data
            var  comments = state.comments
            let updatedComments = newComments.concat(comments)
            if(newComments.length===0){
                console.log("yayyyyyyyy")
                state = {
                    ...state ,
                    snackbarMessage:"No more comments",
                    snackbarOpen:true
                }
            }
            else {
                state= {
                    ...state ,
                    commentPageNumber:c+1,
                    comments : updatedComments
                }
            }
            return state
        default:
            return state
    }
}
export default blogReducer