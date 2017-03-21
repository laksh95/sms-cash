const getDataReducer=(state={
    parentCount:0,
    studentCount:0,
    teacherCount:0,
    events:[]
},action)=>{
	switch(action.type){
    case "GET_PARENT_COUNT":

            state={
        ...state,
        parentCount:action.payload
    };
    break;
    case "GET_STUDENT_COUNT":
            state = {
            ...state,
            studentCount:action.payload
        }
        break;
        case "GET_TEACHER_COUNT":
            state = {
            ...state,
            teacherCount:action.payload
        }
        break;
        case "GET_EVENTS":
            state = {
            ...state,
            events:action.payload
        }
        break;     
}
return state;
};
 export default getDataReducer;