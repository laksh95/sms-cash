import GET_INITIAL_DATA,ADD_TO_CALENDER,DELETE_FROM_CALENDER,SET_SNACK as types from './../constants';
const getDataReducer=(state={
    parentCount:0,
    studentCount:0,
    teacherCount:0,
    openSnack:false,
    events:[]
},action)=>{
	switch(action.type){
	    case GET_INITIAL_DATA+"_FULFILLED":
	    	console.log("success",response);
	        let invalid=0;
	        let messg='';
	        let teacherCount=0;
	        let parentCount=0;
	        let studentCount=0;
	        let events=this.state.events;
	          if(response.data.totalEvent.status==1){        
	            for(let i in response.data.totalEvent){
	              let event1={
	                id:response.data.totalEvent[i].content,
	                start:new Date(response.data.totalEvent[i].start_date),
	                end:new Date(response.data.totalEvent[i].start_date),
	                content:response.data.totalEvent[i].content,
	                type:response.data.totalEvent[i].type,
	                title:response.data.totalEvent[i].content,
	                calendarType:'academic'
	              }
	              events.push(event1)
	            }
	          }
	          else {
	            invalid++;
	            messg=''
	          }
	          if(response.data.personalCalendar.status==1){
	            for(let i in response.data.personalCalendar.data){
	              let event1={
	                id:response.data.personalCalendar[i].content,
	                start:new Date(response.data.personalCalendar[i].start_date),
	                end:new Date(response.data.personalCalendar[i].start_date),
	                content:response.personalCalendar[i].content,
	                type:response.data.personalCalendar[i].heading,
	                title:response.data.personalCalendar[i].heading,
	                calendarType:'personal'
	              }
	              events.push(event1)
	          }
	          this.state.setState({events})
	        }
	        else invalid++; 
	        if(response.data.totalStudents.status==1){
	          teacherCount=response.data.totalStudents.data;
	        }
	        else invalid++;
	        if(response.data.totalStudents.status==1){
	          parentCount=response.data.totalParent.data
	        }
	        else invalid++;
	        if(response.data.totalStudents.status==1){
	          studentCount=response.data.totalTeachers.data;
	        }
	        else invalid++;
	        if(invalid==0){
	        	this.setState({
	          		openSnack:true,
	          		message:'data successfully retrieved!!',
	          		teacherCount:teacherCount,
	          		parentCount:parentCount,
	          		studentCount:studentCount
	        	})
	        }
	        else{
	        	this.setState({
	          		openSnack:true,
	          		message:'data faultily retrieved!!'
	        	})
	        }
	   	 	break;
	    case GET_INITIAL_DATA+"_REJECTED":
	    	this.setState({
	          		openSnack:false,
	          		message:'error'
	        	})
	    	break;
	    case ADD_TO_CALENDER+"_FULFILLED":
	    	let events=this.state.events;
	    	if(response.data.status==1){
		   		let event1={
		            id:response.data.personalCalendar[i].content,
		            start:new Date(response.data.personalCalendar[i].start_date),
		            end:new Date(response.data.personalCalendar[i].start_date),
		            content:response.data.personalCalendar[i].content,
		            type:response.data.personalCalendar[i].heading,
		            title:response.data.personalCalendar[i].heading,
	    			calendarType:'personal'
		        }
		    	events.push(event1)
			 }
			this.setState({
					openSnack:true,
					message:response.data.message
					events:events
			})
	    	break;
	    case ADD_TO_CALENDER+"_REJECTED":
	    	this.setState({
				openSnack:true,
				message:"Oops! Network Failure"
			})
	    	break;
	    case DELETE_FROM_CALENDER+"_FULFILLED":
		    let events=this.state.events
			if(response.data.status==1){
				   			events.splice(index,1)
						}
						this.setState({
			   				openSnack:true,
			   				message:response.data.message
						})  
			        this.props.getEvents(events)
			break;
	    case DELETE_FROM_CALENDER+"_REJECTED":
		    this.setState({
					openSnack:true,
					message:"Oops! Network Failure"
				})
	    	break;
	    case SET_SNACK:
	    	this.setState({
				openSnack:action.payload.data,
				message:action.payload.message
			})
	    	break;
	}
}	