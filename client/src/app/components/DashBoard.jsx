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

const teacherNo=10+" Teachers";
const parentNo=10+" Parents";
const studentNo=10+" Students";
const events = [
	{
		'title': 'Dinner',
		'start':new Date(2015, 3, 12, 20, 0, 0, 0),
		'end': new Date(2015, 3, 12, 21, 0, 0, 0),
		'content':'Having food',
		'creator_name':'Swati'
	},
	{
		'title': 'Dinner',
		'start':new Date(2015, 3, 12, 20, 0, 0, 0),
		'end': new Date(2015, 3, 12, 21, 0, 0, 0),
		'content':'Having food',
		'creator_name':'Swati'
	},
	{
		'title': 'Dinner',
		'start':new Date(2015, 3, 12, 20, 0, 0, 0),
		'end': new Date(2015, 3, 12, 21, 0, 0, 0),
		'content':'Having food',
		'creator_name':'Swati'
	},
	{
		'title': 'Dinner',
		'start':new Date(2015, 3, 12, 20, 0, 0, 0),
		'end': new Date(2015, 3, 12, 21, 0, 0, 0),
		'content':'Having food',
		'creator_name':'Swati'
	},
	{
		'title': 'Dinner',
		'start':new Date(2015, 3, 12, 20, 0, 0, 0),
		'end': new Date(2015, 3, 12, 21, 0, 0, 0),
		'content':'Having food',
		'creator_name':'Swati'
	},
	{
		'title': 'Birthday Party',
		'start':new Date(2015, 3, 13, 7, 0, 0),
		'end': new Date(2015, 3, 15, 10, 30, 0),
		'content':'Having food',
		'creator_name':'Swati'
	}
];
class DashBoard extends React.Component { 
	constructor(props) {
			super(props);
			this.state = {
			open1:false,
			open: false,
			event:{},
			anchorEl: "",
			value:'',
			openbutton: false,
			value24:'',
			date: "1990-06-05",
			format: "YYYY-MM-DD",
			inputFormat: "DD/MM/YYYY",
			mode: "date"
		}
		this.handleTouchTap=this.handleTouchTap.bind(this)
		this.handleChangeSelect=this.handleChangeSelect.bind(this)

	}
handleChangeSelect = (event, index, value) => this.setState({value});
componentWillMount(){
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
	});
};
handleRequestCloseButton = () => {
	this.setState({
		openbutton: false,
	});
};
handleTouchTapSlot = (event) => {
	console.log("event",event)
	this.setState({
		open1: true
	});
};
handleChangeTimePicker24 = (event, date) => {
	this.setState({value24: date});
};

handleTouchTap = (event) => {
	console.log("event",event)
	this.setState({
		open: true,
		event:event,
		anchorEl: event.currentTarget,
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

render() {
console.log(events)
let obj=this
const {date, format, mode, inputFormat} = this.state;
return(
<div>
	<div className="smalldiv">
		<BigCalendar
			popup
			selectable
			events={events}
			culture='en'
			step={15}
			timeslots={8}
			defaultView='week'
			scrollToTime={new Date(1970, 1, 1, 6)}
			defaultDate={new Date(2015, 3, 12)}
			onSelectEvent={this.handleTouchTap}
			onSelectSlot={this.handleTouchTapSlot}
		/>
		<Popover
			style={{marginLeft:'40%', marginTop:'20%', zIndex:'100'}}
			open={this.state.open}
			anchorEl={this.state.anchorEl}
			anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			targetOrigin={{horizontal: 'left', vertical: 'top'}}
			onRequestClose={this.handleRequestClose}>
			<Card style={{backgroundColor:'green'}}>
				<CardHeader
					title={this.state.event.title}
					subtitle={this.state.event.content}					              
				/>
				<CardText >
				</CardText>
			</Card>
		</Popover>
		<Popover
			style={{marginLeft:'40%', marginTop:'20%', zIndex:'100'}}
			open={this.state.open1}
			anchorEl={this.state.anchorEl}
			anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			targetOrigin={{horizontal: 'left', vertical: 'top'}}
			onRequestClose={this.handleRequestCloseCard}>
			<Card style={{zIndex:'-200'}}>
				<CardHeader/>
				<CardText >
					<DatePicker 
						hintText="Landscape Inline Dialog" 
						container="inline" 
						mode="landscape" />
					<p/>
					<SelectField
						floatingLabelText="Type Of Event"
						value={this.state.value}
						onChange={this.handleChangeSelect}>
						<MenuItem value={1} primaryText="Exam" />
						<MenuItem value={2} primaryText="Holiday" />
						<MenuItem value={3} primaryText="Result" />
						<MenuItem value={4} primaryText="Others" />
					</SelectField>
					<p/>
					<TimePicker
						style={{zIndex:'200'}}
						format="24hr"
						hintText="24hr Format"
						value={this.state.value24}
						onChange={this.handleChangeTimePicker24}/>
					<p/>
					<TextField
						hintText="Content/Occasion"
					/>
					<p/>
					<DateTimeField
						dateTime={date}
						format={format}
						viewMode={mode}
						inputFormat={inputFormat}
						onChange={this.handleChange}/>
					<p/>
					<RaisedButton
						onTouchTap={this.handleTap}
						label="Add to my calendar"/>

				</CardText>
			</Card>
		</Popover>
		<Snackbar
			openbutton={this.state.openbutton}
			message="Event added to your calendar"
			autoHideDuration={4000}
			onRequestClose={this.handleRequestCloseButton}
		/>
	</div>
	<div className="smallerDiv">
		<p/>
		<p/>	     		
		<Card style={{backgroundColor:'#00a65a'}}>
			<CardHeader
				title={studentNo}
				subtitle="Subtitle"
				style={{color:'white', fontWeight: 'bold'}}
			/>
			<CardText 
				style={{color:'white'}}>
				Total number of students
			</CardText>
		</Card>
		<p/>
		<p/>

		<Card style={{backgroundColor:'#f56954'}}>
			<CardHeader
				title={teacherNo}
				subtitle="Subtitle"
				style={{color:'white', fontWeight: 'bold'}}
			/>
			<CardText 
				style={{color:'white'}}>
				Total number of teachers
			</CardText>
		</Card>
		<p/>
		<p/>
		<Card style={{backgroundColor:'#0073b7'}}>
			<CardHeader
				title={parentNo}
				subtitle="Subtitle"
				style={{color:'white', fontWeight: 'bold'}}
			/>
			<CardText 
				style={{color:'white'}}>
				Total no of parents
			</CardText>
		</Card>
	</div>
</div>
);
}
}
DashBoard.childContextTypes = {
muiTheme: React.PropTypes.object.isRequired,
};
export default DashBoard;