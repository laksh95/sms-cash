import React from 'react';
import TopBar from './../../components/login/TopBar.jsx'; 
import Login from './../../components/login/Login.jsx'; 
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {browserHistory} from 'react-router';
let loginStyle = require('./../../css/login.css');
import {connect} from "react-redux";
import {loginUser, checkLogin, resetToNoError} from "./../../actions/loginActions.jsx";
import {setErrorMessage} from "./../../actions/errorActions";
import Auth from './../../Auth.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class App extends React.Component {
  componentWillMount() {
    if(this.props.login.isLogin){
        browserHistory.push(this.props.login.prevPathName);
        Auth.authenticateUser(this.props.login.token);
    }
    this.props.resetToNoError();
  }
  componentDidMount() {
      if(this.props.login.isLogin){
        browserHistory.push(this.props.login.prevPathName);
        Auth.authenticateUser(this.props.login.token);
      }
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    if(this.props.login.isLogin){
      browserHistory.push(this.props.login.prevPathName);
      Auth.authenticateUser(this.props.login.token);
    }
    if(this.props.login.showErrorPage){
      this.props.setErrorMessage(this.props.login.errorMessage);
      browserHistory.push('/error');
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.login.isLogin){
  //     console.log("Heyyyyyyyyyy");
  //     browserHistory.push(this.props.login.prevPathName);
  //     Auth.authenticateUser(this.props.login.token);
  //   }
  // }
  render() {
    return (
      <MuiThemeProvider> 
       <div className={loginStyle.mymain} >
         <TopBar />  
         <Login 
         	isLogin={this.props.login.isLogin}
         	token={this.props.login.token}
         	user={this.props.login.loginUser}
            errorText = {this.props.login.errorText}
         	loginUser= {(credential) => this.props.loginUser(credential)}
         	checkLogin= {() => this.props.checkLogin()}
         />         
      </div>
    </MuiThemeProvider> 
    );
  }
}


App.contextTypes = { 
    router: React.PropTypes.object.isRequired
};


const mapStateToProps= (state) => {
	return{
		login: state.login,
    error: state.errorReducer,
    courseReducer: state.courseReducer
	};
};
const mapDispatchToProps= (dispatch) => {
	return{
		loginUser: (credential) =>{
			dispatch(loginUser(credential));
		},
		checkLogin: () =>{
			dispatch(checkLogin());
		},
    setErrorMessage: (message) =>{
      dispatch(setErrorMessage(message));
    },
    resetToNoError: () =>{
      dispatch(resetToNoError());
    } 	
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

