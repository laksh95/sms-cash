import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {getInitialData} from '../../actions/getAdminDashboardDataAction.jsx';
import {store} from "../../store.js";
import {connect} from "react-redux";
import DashBoard from './DashBoard.jsx'; 
import DashBoardNumberOfRole from '../../components/Dashboard/DashBoardNumberOfRole.jsx'; 
const contentStyle = { marginTop:10, marginLeft: 90 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' };

class App extends React.Component{
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		this.props=nextProps
	}
	componentWillMount() {
		this.props.getInitialData(1)
	}
	getChildContext() {
		return { 
			muiTheme: getMuiTheme(baseTheme) 
		};
	}
	render(){
		return(
			<div style={contentStyle}>
					<DashBoard events={this.props.dataDashboardAdmin.events}/>
					<DashBoardNumberOfRole parentNo={this.props.dataDashboardAdmin.parentCount} studentNo={this.props.dataDashboardAdmin.studentCount} teacherNo={this.props.dataDashboardAdmin.teacherCount}/>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	console.log("hellooooooooooooooooooooooooooo",state)
    return{
        dataDashboardAdmin: state.getDataReducer
    };
};
const mapDispatchToProps=(dispatch)=>{
    return{
        getInitialData:(userId)=>{
            dispatch(getInitialData(userId));
        }
    };
};
App.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
export default connect(mapStateToProps,mapDispatchToProps)(App);