import {GET_INITIAL_DATA,ADD_TO_CALENDER,DELETE_FROM_CALENDER,SET_SNACK} from './../constants';

var initialState = {
    parentCount:0,
    studentCount:0,
    teacherCount:0,
    openSnack:false,
    message:'',
    events:[]
}

const getDataReducer = ( state = initialState ,action) => {
	switch(action.type){
	    case GET_INITIAL_DATA+"_FULFILLED":
	    	console.log("success",action.payload);
	        let invalid=0;
	        let messg='';
	        let teacherCount=0;
	        let parentCount=0;
	        let studentCount=0;
	        var events=state.events;
	          if(action.payload.totalEvent.status==200){        
	            for(let i in action.payload.totalEvent){
	              let event1={
	                id:action.payload.totalEvent[i].content,
	                start:new Date(action.payload.totalEvent[i].start_date),
	                end:new Date(action.payload.totalEvent[i].start_date),
	                content:action.payload.totalEvent[i].content,
	                type:action.payload.totalEvent[i].type,
	                title:action.payload.totalEvent[i].content,
	                calendarType:'academic'
	              }
	              events.push(event1)
	            }
	          }
	          else {
	            invalid++;
	            messg=''
	          }
	          if(action.payload.personalCalendar.status==200){
	            for(let i in action.payload.personalCalendar){
	              let event1={
	                id:action.payload.personalCalendar[i].content,
	                start:new Date(action.payload.personalCalendar[i].start_date),
	                end:new Date(action.payload.personalCalendar[i].start_date),
	                content:action.payload.personalCalendar[i].content,
	                type:action.payload.personalCalendar[i].heading,
	                title:action.payload.personalCalendar[i].heading,
	                calendarType:'personal'
	              }
	              events.push(event1)
	          }
	          state = {
	          	...state,
	          	events: events
	          }
	        }
	        else invalid++; 
	        if(action.payload.totalStudents.status==200){
	          teacherCount=action.payload.totalStudents;
	        }
	        else invalid++;
	        if(action.payload.totalStudents.status==200){
	          parentCount=action.payload.totalParent
	        }
	        else invalid++;
	        if(action.payload.totalStudents.status==200){
	          studentCount=action.payload.totalTeachers;
	        }
	        else invalid++;
	        if(invalid==0){
	        	state={ 
	        		...state,
	          		openSnack:false,
	          		teacherCount:teacherCount,
	          		parentCount:parentCount,
	          		studentCount:studentCount
	        	}
	        }
	        else{
	        	state={ ...state,
	          		openSnack:true,
	          		message:action.payload.message,
	          		// message:"Not Added",

	        	}
	        }
	   	 	return state;
	    case GET_INITIAL_DATA+"_REJECTED":
	    	state={ ...state,
	          		openSnack:false,
	          		message:action.payload.message,	        	}
	    	return state;
	    case ADD_TO_CALENDER + "_FULFILLED":
	    	var events=state.events;
	    	if(action.payload.status==200){
		   		let event1={
		            id:action.payload.personalCalendar[i].content,
		            start:new Date(action.payload.personalCalendar[i].start_date),
		            end:new Date(action.payload.personalCalendar[i].start_date),
		            content:action.payload.personalCalendar[i].content,
		            type:action.payload.personalCalendar[i].heading,
		            title:action.payload.personalCalendar[i].heading,
	    			calendarType:'personal'
		        }
		    	events.push(event1)
			 }
			state={ ...state,
					openSnack:true,
	          		message:action.payload.message,
					events:events
			}
	    	return state;
	    case ADD_TO_CALENDER+"_REJECTED":
	    	state={ ...state,
				openSnack:true,
	          		message:action.payload.message,
			}
	    	return state;
	    case DELETE_FROM_CALENDER+"_FULFILLED":
		    var events=state.events
			if(action.payload.status==200){
				   			events.splice(index,1)
						}
						state={ ...state,
			   				openSnack:true,
			   				message:action.payload.message
						}
			        props.getEvents(events)
			return state;
	    case DELETE_FROM_CALENDER+"_REJECTED":
		    state={ ...state,
					openSnack:true,
	          		message:action.payload.message,
				}
	    	return state;
	    case SET_SNACK:
	    	state={ ...state,
				openSnack:action.payload.data,
	          	message:action.payload.message,
			}
	    	return state;
	    default : 
	    	return state
	}
}	

export default getDataReducer