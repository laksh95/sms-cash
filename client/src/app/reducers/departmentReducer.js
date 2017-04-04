import * as types from './../constants';

const initialLoginState={
	departmentList : [],
    queryStatusMessage: "",
    showSlackBar: false,
    selectedTab: "list"
}

const departmentReducer= (state=initialLoginState, action) => {
    switch(action.type){
        case types.GET_ALL_DEPARTMENT_FOR_COURSE + "_FULFILLED":
        	var response= action.payload;
        	if(response){
        		state= {
                	...state,
                	departmentList: response
            	}
        	}            
        break; 

        case types.EDIT_DEPARTMENT + "_FULFILLED":
            var response= action.payload;
            if(response.status==1){
                let selectedDepartment= response.data;
                let allDepartment= state.departmentList;
                for(let i in allDepartment){
                    if(allDepartment[i].id== selectedDepartment.id){
                        allDepartment[i].name= selectedDepartment.name;
                        allDepartment[i].abbreviated_name= selectedDepartment.abbreviated_name;
                    }
                }
                state= {
                    ...state,
                    departmentList: allDepartment,
                    showSlackBar: true,
                    queryStatusMessage: "Department changes succesfully updated!"
                }
            }            
        break; 

         case types.EDIT_DEPARTMENT + "_PENDING":
               state= {
                    ...state
               }
        break; 

        case types.HIDE_SLACKBAR:
            state={
                ...state,
                showSlackBar: false,
                queryStatusMessage: ""
            }
        break;

        case types.CHANGE_SLACKBAR_MSG:
            state={
                ...state,
                showSlackBar: true,
                queryStatusMessage: action.payload
            }
        break;

        case types.DELETE_DEPARTMENT + "_FULFILLED":
            var response= action.payload;
            if(response.status==1){
                let selectedDepartment= response.data;
                let allDepartment= state.departmentList;
                for(let i in allDepartment){
                    if(allDepartment[i].id== selectedDepartment.id){
                        allDepartment.splice(i,1);
                        break;
                    }
                }
                state= {
                    ...state,
                    departmentList: allDepartment,
                    showSlackBar: true,
                    queryStatusMessage: "Department deleted succesfully!"
                }
            }            
        break; 

        case types.ADD_DEPARTMENT + "_FULFILLED":
            var response= action.payload;
            if(response.status==1){
                let addedDepartment= response.data;
                let allDepartment= state.departmentList;
                addedDepartment.total_no_of_students = 0;
                allDepartment.push(addedDepartment);
                state= {
                    ...state,
                    departmentList: allDepartment,
                    showSlackBar: true,
                    queryStatusMessage: "Department Added succesfully!",
                    selectedTab: "list"
                }
            }            
        break; 

        case types.HANDLE_TAB_CHANGE:
            state={
                ...state,
                selectedTab: action.payload
            }
        break;

    }
    return state;
};

export default departmentReducer;
