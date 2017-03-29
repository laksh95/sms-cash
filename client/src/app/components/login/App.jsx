import React from 'react';
import TopBar from './TopBar.jsx'; 
import Login from './Login.jsx'; 
let loginStyle = require('./../../css/login.css');
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";



class App extends React.Component {

  render() {
    console.log("Inside App");
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

const mapStateToProps= (state) => {
	return{
		login: state.login
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

