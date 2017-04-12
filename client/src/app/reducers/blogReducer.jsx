const blogReducer = ( state = {
    open : false
} , action) => {
    switch (action.type){
        case "OPEN_MODAL":
            state = {
                ...state,
                open : action.payload
            }
            return state
        default:
            return state
    }
}

export default blogReducer
