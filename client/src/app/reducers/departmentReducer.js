import * as types from './../constants';

const initialLoginState={
	departmentList : [],
    queryStatusMessage: "",
    showSlackBar: false,
    selectedTab: "list",
    pagination: {
                pageSize: 10,
                totalPages: 1,
                currentPage: 1
            },
    pagedDepartment: [],
    showErrorPage: false,
    errorMessage: ""
}

const departmentReducer= (state=initialLoginState, action) => {
    switch(action.type){
        case types.GET_ALL_DEPARTMENT_FOR_COURSE + "_FULFILLED":
        	var response= action.payload;
            console.log("response-------", response);
        	if(response.status==200){
                let departmentList= response;
                let totalCount= departmentList.length;
                let pageSize=  state.pagination.pageSize;
                let currentPage= state.pagination.currentPage;
                let pagedDepartment= [];
                let index= (currentPage-1)*pageSize;
                for(let i=0; i<10 && index<totalCount; i++){
                    pagedDepartment.push(departmentList[index]);
                    index++;
                }
                let pagination= {
                    pageSize: pageSize,
                    totalPages: totalCount,
                    currentPage: currentPage
                }
        		state= {
                	...state,
                	departmentList,
                    pagedDepartment,
                    pagination
            	}
        	}
        break;

        case types.GET_ALL_DEPARTMENT_FOR_COURSE + "_REJECTED":
            var response= action.payload.response;
            var errorMessage= "";
            if(response){
                if(response.status==500)
                    errorMessage= "500: Internal Server Error!"
                else if(response.status==403)
                    errorMessage= "403: Fobidden!"
                else if(response.status==400){
                    if(response.data.message== 'IS_ALREADY_EXISTS')
                        slackBarMessage="Error: Cannot Add, As the Department already exists!"
                    else
                        slackBarMessage="Error: Bad Request!"
                }
            }
            else
                errorMessage= "500: Internal Server Error!";
            if(errorMessage){
                state= {
                    ...state,
                    showErrorPage: true,
                    errorMessage: "500: Internal Server Error!"
                }
            }


        break;


        case types.PAGE_CHANGE:
            let departmentList= state.departmentList;
            let totalCount= departmentList.length;
            let pageSize= state.pagination.pageSize;
            let currentPage= action.payload;
            let pagedDepartment= [];
            let index= (currentPage-1)*pageSize;
            for(let i=0; i<10 && index<totalCount; i++){
                pagedDepartment.push(departmentList[index]);
                index++;
            }
            let pagination= {
                pageSize: pageSize,
                totalPages: totalCount,
                currentPage: currentPage
            }

            state={
                ...state,
                pagedDepartment,
                pagination
            }
        break;

        case types.EDIT_DEPARTMENT + "_FULFILLED":
            var response= action.payload;
            if(response.status==200){
                let selectedDepartment= response.data;
                let allDepartment= state.departmentList;
                let pagination= state.pagination;
                let pageSize= pagination.pageSize;
                let startIndex= (pagination.currentPage-1)*pageSize;
                let endIndex= startIndex+10;
                let index=-1;
                let pagedDepartment= state.pagedDepartment
                for(let i in allDepartment){
                    if(allDepartment[i].id== selectedDepartment.id){
                        allDepartment[i].name= selectedDepartment.name;
                        allDepartment[i].abbreviated_name= selectedDepartment.abbreviated_name;
                        index=i;
                        break;
                    }
                }
                if(index>=startIndex && index<=endIndex){
                    for(let j in pagedDepartment){
                        if(pagedDepartment[j].id== selectedDepartment.id){
                        pagedDepartment[j].name= selectedDepartment.name;
                        pagedDepartment[j].abbreviated_name= selectedDepartment.abbreviated_name;
                        break;
                        }
                    }
                }

                state= {
                    ...state,
                    departmentList: allDepartment,
                    showSlackBar: true,
                    queryStatusMessage: "Department changes succesfully updated!",
                    pagedDepartment
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
            if(response.status===200){
                let selectedDepartment= response.data;
                let allDepartment= state.departmentList;
                let pagination= state.pagination;
                let startIndex= (pagination.currentPage-1)*pageSize;
                let endIndex= startIndex+10;
                let index=-1;
                let pageSize= pagination.pageSize;
                let pagedDepartment= state.pagedDepartment
                for(let i in allDepartment){
                    if(allDepartment[i].id=== selectedDepartment.id){
                        allDepartment.splice(i,1);
                        index=i;
                        break;
                    }
                }
                if(index>=startIndex && index<=endIndex){
                    for(let j in pagedDepartment){
                        if(pagedDepartment[j].id=== selectedDepartment.id){
                            pagedDepartment.splice(j,1);
                        break;
                        }
                    }
                }
                pagination.totalPages= pagination.totalPages-1;
                pagination.currentPage=1;

                state= {
                    ...state,
                    departmentList: allDepartment,
                    showSlackBar: true,
                    queryStatusMessage: "Department deleted succesfully!",
                    pagination,
                    pagedDepartment
                }
            }
        break;

        case types.ADD_DEPARTMENT + "_FULFILLED":
            var response= action.payload;
            if(response.status==200){
                let addedDepartment= response.data;
                console.log("AddedDepartment:" , addedDepartment);
                let allDepartment= state.departmentList;
                addedDepartment.total_no_of_students = 0;
                allDepartment.push(addedDepartment);
                let totalCount= allDepartment.length;
                let pageSize=  state.pagination.pageSize;
                let currentPage= 1;
                let pagedDepartment= [];
                let index= (currentPage-1)*pageSize;
                for(let i=0; i<10 && index<totalCount; i++){
                    pagedDepartment.push(allDepartment[index]);
                    index++;
                }
                let pagination= {
                    pageSize: pageSize,
                    totalPages: totalCount,
                    currentPage: 1
                }
                state= {
                    ...state,
                    departmentList: allDepartment,
                    showSlackBar: true,
                    queryStatusMessage: "Department Added succesfully!",
                    selectedTab: "list",
                    pagedDepartment,
                    pagination
                }
            }
        break;

        case types.ADD_DEPARTMENT + "_REJECTED":
            var response= action.payload.response;
            var errorMessage= "";
            var slackBarMessage= ""
            if(response){
                if(response.status==500)
                    errorMessage= "500: Internal Server Error!"
                else if(response.status==403)
                    errorMessage= "403: Fobidden!"
                else if(response.status==400){
                    if(response.data.message== 'IS_ALREADY_EXISTS')
                        slackBarMessage="Error: Cannot Add, As the Department already exists!"
                    else
                        slackBarMessage="Error: Bad Request!"
                }
            }
            else
                errorMessage= "500: Internal Server Error!";
            if(errorMessage){
                 state= {
                    ...state,
                    showErrorPage: true,
                    errorMessage: errorMessage
                }
            }
            else{
                state= {
                    ...state,
                    showSlackBar: true,
                    queryStatusMessage: slackBarMessage
                }
            }

        break;

        case types.HANDLE_TAB_CHANGE:
            state={
                ...state,
                selectedTab: action.payload
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

export default departmentReducer;
