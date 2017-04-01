import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
class DashBoard extends React.Component { 
	constructor(props) {
		super(props);
	}
	getChildContext() {
		return { 
			muiTheme: getMuiTheme(baseTheme) 
		};
	}
	render() {
		return(
			<div className="smallerDiv">
				<Card className='imgp'>
					<CardHeader
						title={this.props.studentNo}
						subtitle="Total number of students"
						style={{color:'white', fontWeight: 'bold'}}
					/>					
				</Card>
				<br/><br/>
				<Card className='imgt'>
					<CardHeader
						title={this.props.teacherNo}
						subtitle="Total number of teachers"
						style={{color:'white', fontWeight: 'bold'}}
					/>					
				</Card>
				<br/><br/>
				<Card className='imgs'>
					<CardHeader
						title={this.props.parentNo}
						subtitle="Total no of parents"
						style={{color:'white', fontWeight: 'bold'}}
					/>
				</Card>
			</div>
		);
	}
}
DashBoard.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
export default DashBoard;