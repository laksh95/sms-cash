import * as types from './../constants';

const initialLoginState={
	isLogin : false,
	loginUser: {},
	token: ""
}

const loginReducer= (state=initialLoginState, action) => {
    switch(action.type){
        case types.LOGIN + "_FULFILLED":
        case types.CHECK_IS_LOGIN + "_FULFILLED":
        	let response= action.payload;
            let user= response.user;

            //getting role object
            let roleArray= response.user.role;
            let role= {
                isAdmin:false,
                isDirector:false,
                isTeacher:false,
                isStudent:false,
                isHod:false,
                };
            if(roleArray.indexOf('admin')>-1){
                role.isAdmin =true
            }
            if(roleArray.indexOf('director')>-1){
                role.isDirector =true
            }
             if(roleArray.indexOf('teacher')>-1){
                role.isTeacher =true
            }
            if(roleArray.indexOf('hod')>-1){
                role.isHod =true
            }
            if(roleArray.indexOf('student')>-1){
                role.isStudent =true
            }
            user.role=role;
        	if(response.isLogin){
        		state= {
                	...state,
                	isLogin:true,
 					token: response.token,
 					loginUser: user
            	}
        	}            
        break; 

        case types.LOGOUT:
        case types.LOGIN + "_REJECTED":
        case types.CHECK_IS_LOGIN + "_REJECTED":
            state={
                ...state,
                isLogin: false,
                token: "", 
                loginUser: {}
            }
    }
    return state;
};

export default loginReducer;

