import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
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
import TimePicker from 'material-ui/TimePicker';
import {DateTimeField} from 'react-bootstrap-datetimepicker';
import SimpleTimePicker from 'react-simple-time-picker'

const teacherNo=10+" Teachers";
const parentNo=10+" Parents";
const studentNo=10+" Students";
class DashBoard extends React.Component { 
	constructor(props) {
			super(props);
			this.state = {
			open1:false,
			open: false,
			openSnack: false,
			event:{},
			type:'',
			content:'',
			openbutton: false,
			startDate:'',
			endDate:'',			
			startTime:'',
			endTime:''
		}
		this.handleTouchTap=this.handleTouchTap.bind(this)
		this.handleChangeSelect=this.handleChangeSelect.bind(this)
	}
	handleChangeSelect = (event, index, value) => 
		{
			this.setState({
				type:value
			});
		}
	componentWillMount(){
		let ob=this;
		console.log("inside comonenWillMount:",this.props.events)
		BigCalendar.momentLocalizer(moment);
	}
	getChildContext() {
		return { 
			muiTheme: getMuiTheme(baseTheme) 
		};
	}
	handleTap = () => {
		this.setState({
			openbutton: true,
			open1: false,
		})
	axios.post('http://192.168.1.247:1234/api/academicCalendar/dashboard/addHoliday', {
		type: this.state.type,
		startDate: this.state.event.start,
		endDate:this.state.event.end ,
		holidayName: this.state.content  
   	})
	.then(function (response) {
		console.log("success",response);
	})
	.catch(function (response) {
		console.log("failure",response);
	});
		console.log("state",this.state)
	};
	handleRequestCloseButton = () => {
		this.setState({
			openbutton: false,
		});
	};
	handleTouchTapSlot = (event) => {
		let endDate=event.end.toDateString();
		let startDate=event.start.toDateString();
		let endTime=event.end.toTimeString();
		let starTime=event.start.toTimeString();
		this.setState({
			open1: true,
			event:event,
			startDate:startDate,
			endDate:endDate,			
			startTime:starTime,
			endTime:endTime
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
			open1: false,
		});
	};
	handleChange = (newDate) => {
		console.log("newDate", newDate);
		return this.setState({date: newDate});
	}
	handleChangeStartDate=(event)=>{
		this.setState({
    		startDate: event.target.value,
    });
	}
	handleChangeStartTime=(event)=>{
		this.setState({
     		startTime: event.target.value,
    });
	}
	handleChangeEndDate=(event)=>{
		this.setState({
    		endDate: event.target.value,
    });
	}
	handleChangeEndTime=(event)=>{
		this.setState({
    		endTime: event.target.value,
    });
	}
	handleChangeContent=(event)=>{
		this.setState({
    		content: event.target.value,
    });
	}
	render() {
		console.log("inside render",this.state.events)
		let obj=this
		const {date, format, mode, inputFormat} = this.state;
		return(
			<div className="smalldiv">
				<BigCalendar
					popup
					selectable
					events={this.props.events}
					culture='en'
					step={15}
					timeslots={8}
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
						<CardText >
						</CardText>
					</Card>
				</Popover>
				<Popover
					style={{marginLeft:'40%', marginTop:'10%', zIndex:'100'}}
					open={this.state.open1}
					onRequestClose={this.handleRequestCloseCard}>
					<Card style={{zIndex:'-200'}}>
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
							<p/>
							<TextField
								hintText="Content/Occasion"
								onChange={this.handleChangeContent}
							/>
							<p/>
							<p>Start Date:&nbsp;
								<TextField
									value={this.state.startDate}
									onChange={this.handleChangeStartDate}
								/>
							</p>
							<p>Start Time:&nbsp;
								<TextField
									value={this.state.startTime}
									onChange={this.handleChangeStartTime}
								/>
							</p>
							<p>End Date:&nbsp;
								<TextField
									value={this.state.endDate}
									onChange={this.handleChangeEndDte}
								/>
							</p>
							<p>End Time:&nbsp;
								<TextField
									value={this.state.endTime}
									onChange={this.handleChangeEndTime}
								/>
							</p>
							<RaisedButton
								onTouchTap={this.handleTap}
								label="Add to my calendar"/>
							<Snackbar
								open={this.state.openSnack}
								message="Event added to your calendar"
								autoHideDuration={4000}
								onRequestClose={this.handleRequestClose}
					        />
						</CardText>
					</Card>
				</Popover>
			</div>
		);
	}
}
DashBoard.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
export default DashBoard;