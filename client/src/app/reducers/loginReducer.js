import * as types from './../constants';
import Auth from './../Auth.js';

const initialLoginState={
  isLogin : false,
  loginUser: {},
  token: "",
  errorText:"",
  prevPathName: "/",
  receivedResponse: true,
  showErrorPage: false,
  errorMessage: ""
} 

const loginReducer= (state=initialLoginState, action) => {
    switch(action.type){
        case types.CHECK_IS_LOGIN + "_FULFILLED":
            state={
                ...state,
                receivedResponse: true 
            }
        case types.LOGIN + "_FULFILLED":
        
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
                Auth.authenticateUser(response.token);
            state= {
                  ...state,
                  isLogin:true,
          token: response.token,
          loginUser: user
              }
          }            
        break; 

        case types.CHECK_IS_LOGIN + "_PENDING":
        case types.LOGIN + "_PENDING":
            state= {
                ...state,
                receivedResponse: false
            } 
        break; 


        case types.RES_PENDING:
            state= {
                ...state,
                receivedResponse: action.payload
            } 
        break;  

        case types.CHECK_IS_LOGIN + "_REJECTED":
            state={
                ...state,
                errorText:"Incorrect username or Password",
                receivedResponse: true 
            }
     
        case types.LOGIN + "_REJECTED":

             if(action.payload.response === undefined){

                      Auth.deauthenticateUser();
                      state={
                         ...state,
                         showErrorPage: true,
                         errorMessage: "Network Error",
                         isLogin: false,
                         token: "", 
                         errorText:action.payload.message,
                         loginUser: {}
                     } 

              }else{
          
                 switch(action.payload.response.data.errors){
                      case 'IncorrectCredentialsError':
                         Auth.deauthenticateUser();
                           state={
                            ...state,
                            isLogin: false,
                            token: "", 
                            errorText:action.payload.response.data.message,
                            loginUser: {}
                     } 
                 break;
                      case 'InternalServerError':
                         Auth.deauthenticateUser();
                          state={
                            ...state,
                            isLogin: false,
                            token: "", 
                            errorText:action.payload.response.data.message,
                            loginUser: {}
                          } 
                 break;

              }

             if(action.payload.response.data.errors.username === 'MissingUsernameError'){
                   
                     Auth.deauthenticateUser();
                     state={
                        ...state,
                        isLogin: false,
                        token: "", 
                        errorText:action.payload.response.data.message,
                        loginUser: {}
                     } 
               }

           if(action.payload.response.data.errors.password === 'MissingPasswordError'){

               Auth.deauthenticateUser();
                 state={
                  ...state,
                  isLogin: false,
                  token: "", 
                  errorText:action.payload.response.data.message,
                  loginUser: {}
                 } 
               }
 
           }
        break;
          

        case types.SETPREVPATH:
            state={
                ...state,
                prevPathName: action.payload
            }
        break;

        case types.LOGOUT:

          Auth.deauthenticateUser();
                 state={
                  ...state,
                  isLogin: false,
                  token: "", 
                  errorText:'',
                  loginUser: {}
                 } 
        break;

        case types.RESET_ERROR:
          state={
            ...state,
            showErrorPage: false,
            errorMessage: ""
          }
        break;
    }
    return state;
};

export default loginReducer;
