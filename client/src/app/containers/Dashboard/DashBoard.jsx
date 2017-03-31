import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import DashBoardNumberOfRole from '../../components/Dashboard/DashBoardNumberOfRole.jsx';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
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
import {store} from "../../store.js";
import {connect} from "react-redux";
import {getEvents} from '../../actions/getDataAction.jsx';
const currentdate=moment().format("YYYY-MM-DD");
class DashBoard extends React.Component { 
	constructor(props) {
		super(props);
		this.state = {
		openCard:false,
		open: false,
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
	handleTouch=(event,choice)=>{
		switch(choice){
			case 'DELETE_EVENT':
				let id=this.state.event.id;
				let events=this.props.data.events;
				for(let i in events){
					if(events[i]==id){
						index=i;
						break;
					}
				}		
			break;
			case 'CLOSE_NEW_EVENT_CARD':
				this.setState({
					openCard:false,
					type:'',
					content:'',
					typeError:'',
					contentError:'',
					dateError:''
				})
			break;
			case 'TAP_CALENDAR_SLOT':
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
			break;
			case 'TAP_CALENDER_EVENT':
				this.setState({
					openCard: false,
				});
			break;
			case 'SHOW_EVENT_DETAILS':
				this.setState({
					open: true,
					event:event
				});
			break;
			case 'ADD_EVENT':
				let valid=0;
				let start=moment(this.state.startDate+" "+this.state.startTime, 'HH:mm')._i;
				let end=moment(this.state.endDate+" "+this.state.endTime, 'HH:mm')._i;
				let typeError='';
				let contentError='';
				let dateError='';	
				if(this.state.type==''){
					typeError="*Type empty"
				}
				else{
					valid++;
				}
				if(this.state.content==''){
					contentError="*Content empty"
				}
				else{
					valid++;
				}
				if(moment(start).isAfter(end)){
						dateError="*Start Date ahead of end date"
				}
				else{
					valid++;
				}
				if(valid==3){
					let url='';
					let newEvent={
						heading: this.state.type,
						startDate:this.state.start,
						endDate:this.state.end,
						content: this.state.content,
						userId: 1
					}
					let type='';
					let method=''
					if(this.state.calendarType='personal'){
						type='personalCalendar'
						method='addPersonalEvent'
					}
					else if(this.state.calendarType='academic'){
						type='academicCalendar'
						method='addEvent'
					}
					addToCalendar(type,method,newEvent);
				}
				else{
					valid= 0;
					this.setState({
						typeError=typeError,
						contentError=contentError,
						dateError=dateError
					});
				}	
			};
			break;
			case 'DELETE_EVENT':
				let id=this.state.event.id;
				let events=this.props.data.events;
				for(let i in events){
					if(events[i]==id){
						index=i;
						break;
					}
				}
				let type='';
				let method='';
				let id=this.state.event.id;
				if(this.state.event.calendarType='personal'){
					type='personalCalendar';
					method='deletePersonalEvent'
				}
				else{
					type='academicCalendar';
					method='deleteEvent'
				}
				deletefromCalendar(type,method,id)
			break;
			case 'CHANGE_START_DATE':
				this.setState({
					dateError:'',
		    		startDate: event.target.value,
		   		 });
			break;
			case 'CHANGE_START_TIME':
				this.setState({
					dateError:'',
	     			startTime: event.target.value,
	    		});
			break;
			case 'CHANGE_END_DATE':
				this.setState({
	    			dateError:'',
					endDate: event.target.value,
	    	});
			break;
			case 'CHANGE_END_TIME':
				this.setState({
	    			dateError:'',
					endTime: event.target.value,
	    		});
			break;
			case 'CHANGE_CONTENT':
				this.setState({
					contentError:'',
	    			content: event.target.value,
	    	});
			break;
			case 'CLOSE_EVENT_CARD':
				this.setState({
					open: false,
				});
			break;
			case 'SET_SNACK':
      			let openSnack= false;
      			let message=''
      			this.props.setSnackData(openSnack,message)
    		break;
			
		}
	}
	handleRadioButton=(event,value)=>{
		this.setState({
			calendarType:value	
		})
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
	
	handleChange = (newDate) => {
		return this.setState({date: newDate});
	}
	//{(evt) => this.handleRemove(id, evt)}
	render() {
		let obj=this
		console.log(currentdate)
		const {date, format, mode, inputFormat} = this.state;
		return(
			<div>
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
					onSelectEvent={(evt) => this.handleTouch('SHOW_EVENT_DETAILS', evt)}
					onSelectSlot={(evt) => this.handleTouch('TAP_CALENDAR_SLOT', evt)}
				/>
				<Popover
					style={{marginLeft:'40%', marginTop:'20%', zIndex:'100'}}
					open={this.state.open}
					onRequestClose={(evt) => this.handleTouch('CLOSE_EVENT_CARD', evt)}>
					<Card className='cardName'>
						<CardHeader
							title={this.state.event.title}
							subtitle={this.state.event.content}					              
						/>
						<RaisedButton
							onTouchTap={(evt) => this.handleTouch('DELETE_EVENT', evt)}
							label="Delete Event"/>
					</Card>
				</Popover>
				<Popover
					style={{marginLeft:'40%', marginTop:'10%', zIndex:'100'}}
					open={this.state.openCard}
					onRequestClose={(evt) => this.handleTouch('CLOSE_NEW_EVENT_CARD', evt)}>
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
								onChange={(evt) => this.handleTouch('CHANGE_CONTENT', evt)}/>
								<br/>
								<label className="lerr" >{this.state.contentError}</label>						
							<br/>
							Start Date:&nbsp;
								<input type="date" className="style-4" value={this.state.startDate} onChange={(evt) => this.handleTouch('CHANGE_START_DATE', evt)} min={currentdate} />
							<br/><br/>
							Start Time:&nbsp;
								<input type="time" className="style-4" value={this.state.startTime} onChange={(evt) => this.handleTouch('CHANGE_START_TIME', evt)}/>
							<br/><br/>
							End Date:&nbsp;								    
								<input type="date" className="style-4" value={this.state.endDate} onChange={(evt) => this.handleTouch('CHANGE_END_DATE', evt)} min={currentdate}/>
							<br/><br/>
							End Time:&nbsp;
								<input type="time" value={this.state.endTime} onChange={(evt) => this.handleTouch('CHANGE_END_TIME', evt)}/><br/>
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
								onTouchTap={(evt) => this.handleTouch('ADD_EVENT', evt)}
								label="Add to my calendar"/>
								&nbsp;
							<RaisedButton
								onTouchTap={(evt) => this.handleTouch('CLOSE_NEW_EVENT_CARD', evt)}
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
		<DashBoardNumberOfRole/>
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