import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {getInitialData} from '../../actions/getAdminDashboardDataAction';
import {store} from "../../store.js";
import {connect} from "react-redux";
import DashBoard from './DashBoard.jsx'; 
import DashBoardNumberOfRole from '../../components/Dashboard/DashBoardNumberOfRole.jsx'; 

class App extends React.Component{
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		this.props=nextProps;

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
		var height = window.innerHeight;
		return(
			<div style={{height:height}}>
				<DashBoard events={this.props.dataDashboardAdmin.events}/>
				<DashBoardNumberOfRole parentNo={this.props.dataDashboardAdmin.parentCount} studentNo={this.props.dataDashboardAdmin.studentCount} teacherNo={this.props.dataDashboardAdmin.teacherCount}/>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
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