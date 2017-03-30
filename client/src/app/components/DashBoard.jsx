import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} fro12m 'material-ui/RadioButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import 'moment/locale/nb';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {store} from "../store.js";
import {connect} from "react-redux";
import {getEvents} from '../actions/getDataAction.jsx';
const currentdate=moment().format("YYYY-MM-DD");
class DashBoard extends React.Component { 
	constructor(props) {
		super(props);
		this.state = {
		openCard:false,
		open: false,
		openSnack: false,
		event:{},
		type:'',
		content:'',
		openbutton: false,
		startDate:'',
		endDate:'',			
		startTime:'',
		endTime:'',
		start:'',
		end:'',
		typeError:'',
		contentError:'',
		c:'',
		valid:0,
		message:'',
		calendarType:''
	}	
	}
	handleRadioButton=(event,value)=>{
		this.setState({
			calendarType:value	
		})
	}
	handleCloseButton=(event)=>{
		this.setState({
			openCard:false,
			type:'',
			content:'',
			typeError:'',
			contentError:'',
			dateError:''
		}
	)
	}

	handleDeleteTap=(event)=>{
		let id=this.state.event.id;
		let events=this.props.data.events;
		for(let i in events){
			if(events[i]==id){
				index=i;
				break;
			}
		}
		let url='';
		if(this.state.event.calendarType='personal'){
			url='http://localhost:1234/api/personalCalendar/dashboard/deletePersonalEvent'
		}
		else{
			url='http://localhost:1234/api/academicCalendar/dashboard/deleteEvent'
		}
		axios.put(url, {
				id: this.state.event.id,				 
	   		}).then((response)=> {
	   			if(response.data.status==1){
	   			events.splice(index,1)
			}
			this.setState({
   				openSnack:true,
   				message:response.data.message
			})  
        this.props.getEvents(events)
      	}).catch(function (response) {
        this.setState({
				openSnack:true,
				message:"Oops! Network Failure"
		})
  });
	}
	
	handleChangeSelect = (event, index, value) =>{
			this.setState({
				typeError:'',
				type:value
			});
		}
	componentWillMount(){
		BigCalendar.momentLocalizer(moment);
	}
	getChildContext() {
		return { 
			muiTheme: getMuiTheme(baseTheme) 
		};
	}
	handleTap = () => {
		console.log(this.state);
		let valid=0;
		let start=moment(this.state.startDate+" "+this.state.startTime, 'HH:mm')._i;
		let end=moment(this.state.endDate+" "+this.state.endTime, 'HH:mm')._i;
		console.log("start",start);
		console.log("end",end);
		this.setState({
			start:start,
			end:end,
		});	
		console.log("state",this.state.end)
		if(this.state.type==''){
			this.setState({
				typeError:"*Type empty"
			})
		}
		else{
			valid++;
		}
		if(this.state.content==''){
			this.setState({
				contentError:"*Content empty"
			})
		}
		else{
			valid++;
		}

		if(moment(start).isAfter(end)){
			this.setState({
				dateError:"*Start Date ahead of end date"
			})
		}
		else{
			valid++;
		}
		if(valid==3){
			let url='';
			if(this.state.calendarType='personal'){
				url='http://localhost:1234/api/personalCalendar/dashboard/addPersonalEvent';
			}
			else if(this.state.calendarType='academic'){
				url='http://localhost:1234/api/academicCalendar/dashboard/addEvent'
			}
			axios.post(url, {
				heading: this.state.type,
				startDate:this.state.start,
				endDate:this.state.end,
				content: this.state.content,
				userId: 1
			}).then((response)=> {
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
				})
		        this.props.getEvents(events)
		      	}).catch((response)=> {
		        	this.setState({
	   					openSnack:true,
	   					message:"Oops! Network Failure"
					})
				})
		}
		else{
			valid= 0;
		}	
	};
	
	handleTouchTapSlot = (event) => {
		let newEvent={};
		console.log("event",typeof(event.start))
		let endDate=moment(event.end).format("YYYY-MM-DD");
		let startDate=moment(event.start).format("YYYY-MM-DD");
		let endTime=moment(event.end).format('hh:mm')	
		let startTime=moment(event.start).format('hh:mm')
		let start=moment(startDate+" "+startTime, 'HH:mm')._i;
		let end=moment(endDate+" "+endTime, 'HH:mm')._i;
		this.setState({
			openCard: true,
			start:start,
			end:end,
			startDate:startDate,
			endDate:endDate,			
			startTime:startTime,
			endTime:endTime,
			typeError:'',
			contentError:'',
			dateError:'',
			type:'',
			content:''
		});
	};
	handleTouchTap = (event) => {
		this.setState({
			open: true,
			event:event
		});
	};
	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};
	handleRequestCloseCard = () => {
		this.setState({
			openCard: false,
		});
	};
	handleChange = (newDate) => {
		return this.setState({date: newDate});
	}
	handleChangeStartDate=(event)=>{
		this.setState({
			dateError:'',
    		startDate: event.target.value,
    });
	}
	handleChangeStartTime=(event)=>{
		this.setState({
			dateError:'',
     		startTime: event.target.value,
    });
	}
	handleChangeEndDate=(event)=>{
		this.setState({
    		dateError:'',
			endDate: event.target.value,
    	});
	}
	handleChangeEndTime=(event)=>{
		this.setState({
    		dateError:'',
			endTime: event.target.value,
    	});
	}
	handleChangeContent=(event)=>{
		this.setState({
			contentError:'',
    		content: event.target.value,
    	});
	}
	handleSnackRequestClose=(event)=>{
		this.setState({
      		openSnack: false,
      		message:''
    });
	}
	render() {
		let obj=this
		console.log(currentdate)
		const {date, format, mode, inputFormat} = this.state;
		return(
			<div className="smalldiv">
				<BigCalendar
					popup
					selectable
					events={this.props.data.events}
					culture='en-GB'
					step={15}
					timeslots={2}
					defaultView='week'
					scrollToTime={new Date(1970, 1, 1, 6)}
					defaultDate={new Date()}
					onSelectEvent={this.handleTouchTap}
					onSelectSlot={this.handleTouchTapSlot}
				/>
				<Popover
					style={{marginLeft:'40%', marginTop:'20%', zIndex:'100'}}
					open={this.state.open}
					onRequestClose={this.handleRequestClose}>
					<Card className='cardName'>
						<CardHeader
							title={this.state.event.title}
							subtitle={this.state.event.content}					              
						/>
						<RaisedButton
							onTouchTap={this.handleDeleteTap}
							label="Delete Event"/>
					</Card>
				</Popover>
				<Popover
					style={{marginLeft:'40%', marginTop:'10%', zIndex:'100'}}
					open={this.state.openCard}
					onRequestClose={this.handleRequestCloseCard}>
					<Card style={{zIndex:'-200'}} className='cardName'>
						<CardHeader/>
						<CardText >
							<SelectField
								floatingLabelText="Type Of Event"
								value={this.state.type}
								onChange={this.handleChangeSelect}>
								<MenuItem value="exam" primaryText="Exam" />
								<MenuItem value="holiday" primaryText="Holiday" />
								<MenuItem value="result"  primaryText="Result" />
								<MenuItem value="others" primaryText="Others" />
							</SelectField>
							<br/>
							<label className="lerr" >{this.state.typeError}</label>	<br/>			
							<TextField
								value={this.state.content}
								hintText="Content/Occasion"
								onChange={this.handleChangeContent}/>
								<br/>
								<label className="lerr" >{this.state.contentError}</label>						
							<br/>
							Start Date:&nbsp;
								<input type="date" className="style-4" value={this.state.startDate} onChange={this.handleChangeStartDate} min={currentdate} />
							<br/><br/>
							Start Time:&nbsp;
								<input type="time" className="style-4" value={this.state.startTime} onChange={this.handleChangeStartTime} />
							<br/><br/>
							End Date:&nbsp;								    
								<input type="date" className="style-4" value={this.state.endDate} onChange={this.handleChangeEndDate} min={currentdate}/>
							<br/><br/>
							End Time:&nbsp;
								<input type="time" value={this.state.endTime} onChange={this.handleChangeEndTime}/><br/>
								<label className="lerr" >{this.state.dateError}</label>
							<br/>
							<RadioButtonGroup name="calendar" defaultSelected="academic" onChange="handleRadioButton">
								<RadioButton 
									labelStyle={{font:'110% arial, sans-serif'}}
							        value="academic"
							        label="Academic Calendar"
							    />
							    <RadioButton
							    	labelStyle={{font:'110% arial, sans-serif'}}
							        value="personal"
							        label="Personal Calendar"
							    />
							</RadioButtonGroup>
							<br/>
							<RaisedButton
								onTouchTap={this.handleTap}
								label="Add to my calendar"/>
								&nbsp;
							<RaisedButton
								onTouchTap={this.handleCloseButton}
								label="X"/>
						</CardText>
					</Card>
				</Popover>
				<Snackbar
					open={this.state.openSnack}
					message={this.state.message}
					autoHideDuration={4000}
					onRequestClose={this.handleSnackRequestClose}
		        />
			</div>
		);
	}
}
const mapStateToProps=(state)=>{
    return{
        data:state.data
    };
};
const mapDispatchToProps=(dispatch)=>{
    return{
        getEvents:(events)=>{
            dispatch(getEvents(events));
        }
    };
};
DashBoard.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
export default connect(mapStateToProps,mapDispatchToProps)( DashBoard);