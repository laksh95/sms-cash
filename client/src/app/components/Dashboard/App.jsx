import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
class App extends React.Component{
	render(){
		return{
			<div>
				<DashBoard />
				<DashBoardNumberOfRole parentNo={this.props.data.parentCount} studentNo={this.props.data.studentCount} teacherNo={this.props.data.teacherCount}/>
			</div>
		}
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
App.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
export default connect(mapStateToProps,mapDispatchToProps)(App);