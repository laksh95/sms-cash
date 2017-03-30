import React from 'react';
import TopBar from './../../components/login/TopBar.jsx'; 
import Login from './../../components/login/Login.jsx'; 
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {browserHistory} from 'react-router';
let loginStyle = require('./../../css/login.css');
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";
import Auth from './../../Auth.js';

class App extends React.Component {

  componentDidMount() {
      if(this.props.login.isLogin){
        browserHistory.push('/dashboard');
        Auth.authenticateUser(this.props.login.token);
      }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.login.isLogin){
      browserHistory.push('/dashboard');
      Auth.authenticateUser(this.props.login.token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.login.isLogin){
      browserHistory.push('/dashboard'); 
      Auth.authenticateUser(this.props.login.token);
    }
  }

  render() {
    return (
       <div className={loginStyle.mymain} >
         <TopBar />  
         <Login 
         	isLogin={this.props.login.isLogin}
         	token={this.props.login.token}
         	user={this.props.login.loginUser}
         	loginUser= {(credential) => this.props.loginUser(credential)}
         	checkLogin= {() => this.props.checkLogin()}
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
		login: state.login
	};
};


const mapDispatchToProps= (dispatch) => {
	return{
		loginUser: (credential) =>{
			dispatch(loginUser(credential));
		},
		checkLogin: () =>{
			dispatch(checkLogin());
		}	
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

