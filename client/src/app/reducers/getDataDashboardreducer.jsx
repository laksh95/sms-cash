import {GET_INITIAL_DATA_DASHBOARD,ADD_TO_CALENDER,DELETE_fROM_CALENDER,SET_SNACK} from './../constants';

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
	    case GET_INITIAL_DATA_DASHBOARD+"_FULFILLED":
	        let invalid=0;
	        let messg='';
	        let teacherCount=0;
	        let parentCount=0;
	        let studentCount=0;
	        var events=[];
	          if(action.payload.status==200){        
	            for(let i in action.payload.totalEvent){
	            	console.log("events---------->",action.payload.totalEvent,action.payload.personalCalendar )
	              let event1={
	                id:action.payload.totalEvent[i].content,
	                start:new Date(action.payload.totalEvent[i].start_date),
	                end:new Date(action.payload.totalEvent[i].end_date),
	                content:action.payload.totalEvent[i].content,
	                type:action.payload.totalEvent[i].type,
	                title:action.payload.totalEvent[i].content,
	                calendarType:'academicCalendar'
	              }
	              events.push(event1)
	            }
	            for(let i in action.payload.personalCalendar){
	              let event1={
	                id:action.payload.personalCalendar[i].content,
	                start:new Date(action.payload.personalCalendar[i].start_date),
	                end:new Date(action.payload.personalCalendar[i].end_date),
	                content:action.payload.personalCalendar[i].content,
	                type:action.payload.personalCalendar[i].heading,
	                title:action.payload.personalCalendar[i].heading,
	                calendarType:'personalCalendar'
	              }
	              events.push(event1)
	          	}
				teacherCount=action.payload.totalStudents;
				parentCount=action.payload.totalParent
				studentCount=action.payload.totalTeachers;
				state={ 
					...state,
					openSnack:false,
					events: events,
					teacherCount:teacherCount,
					parentCount:parentCount,
					studentCount:studentCount
				}

	          }
	          else {
	          	state={ 
					...state,
					message:action.payload.message
				}
	          }
	   	 	return state;
	    case GET_INITIAL_DATA_DASHBOARD+"_REJECTED":
	    	state={ ...state,
	          		openSnack:false,
	          		message:action.payload.message,	        	}
	    	return state;
	    case ADD_TO_CALENDER + "_FULFILLED":
	    	console.log("success add------------------>",new Date(action.payload.end_date));
	    	var events=state.events;
	    	if(action.payload.status==200){
		   		let event1={
		            id:action.payload.id,
		            start:new Date(action.payload.start_date),
		            end:new Date(action.payload.end_date),
		            content:action.payload.content,
		            type:action.payload.heading,
		            title:action.payload.heading,
	    			calendarType:action.payload.type
		        }
		    	events.push(event1)
			 }
			state={ ...state,
					message:"Successfully Added!!",
					openSnack:true,
					events:events
			}
	    	return state;
	    case ADD_TO_CALENDER+"_REJECTED":
	    	state={ ...state,
				openSnack:true,
	          		message:action.payload.message,
			}
	    	return state;
	    case DELETE_fROM_CALENDER+"_FULFILLED":
		    var events=state.events
			if(action.payload.status==200){
	   			events.splice(action.payload.index,1)
			}
			state={ 
				...state,
   				openSnack:true,
   				message:action.payload.message,
   				events:events
			}
	        props.getEvents(events)
			return state;
	    case DELETE_fROM_CALENDER+"_REJECTED":

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