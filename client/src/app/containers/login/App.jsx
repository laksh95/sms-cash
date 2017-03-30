import React from 'react';
import TopBar from './../../components/login/TopBar.jsx'; 
import Login from './../../components/login/Login.jsx'; 
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

let loginStyle = require('./../../css/login.css');
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";


class App extends React.Component {

  render() {
    return (
       <div className={loginStyle.mymain} >
         <TopBar />  
         <Login 
         	isLogin={this.props.login.isLogin}
         	token={this.props.login.token}
         	user={this.props.login.loginUser}
         	loginUser= {(credential) => this.props.loginUser(credential)}
         	checkLogin= {(config) => this.props.checkLogin(config)}
         />         
      </div>
    );
  }
}

App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
App.contextTypes = { 
    router: React.PropTypes.object.isRequired
};


const mapStateToProps= (state) => {
	return{
		login: state.login,
        courseReducer: state.courseReducer
	};
};
const mapDispatchToProps= (dispatch) => {
	return{
		loginUser: (credential) =>{
			dispatch(loginUser(credential));
		},
		checkLogin: (config) =>{
			dispatch(checkLogin(config));
		}	
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

