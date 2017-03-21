import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
class DashBoard extends React.Component { 
	constructor(props) {
			super(props);
	}
	render() {
		return(
			<div className="smallerDiv">
				<p/>
				<p/>	     		
				<Card style={{backgroundColor:'#00a65a'}}>
					<CardHeader
						title={this.props.studentNo}
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
						title={this.props.teacherNo}
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
						title={this.props.parentNo}
						subtitle="Subtitle"
						style={{color:'white', fontWeight: 'bold'}}
					/>
					<CardText 
						style={{color:'white'}}>
						Total no of parents
					</CardText>
				</Card>
			</div>
		);
	}
}
DashBoard.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
export default DashBoard;