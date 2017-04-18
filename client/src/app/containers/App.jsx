import React from 'react';
import SideBarMenu from './../components/SideBarMenu.jsx';
import TopBar from './TopBar.jsx'; 
import Auth from './../Auth.js';
import {checkLogin, logoutUser, setUrl, setReceivedResponse} from "./../actions/loginActions";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';

var style = {

   "MainContentStyle":{
       marginLeft: 70 ,
       transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' 
   },

   "ContentTitle":{
       marginTop:10, 
       marginLeft: 70,
       transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' 
   }
}

class App extends React.Component {

    constructor(props){
        super(props);
       
        this.state = {
          open: true,        
        };
    }
   
    handleToggle = () => { 
      this.setState({open: !this.state.open});
    }

    // componentWillMount() {
    //   var token = Auth.getToken();
    //   let path= this.props.location.pathname;
    //
    //   this.props.setUrl(path);
    //   this.props.setReceivedResponse(false);
    //
    //   if(token !=null){
    //     this.props.checkLogin();
    //   }
    //   else if(!this.props.login.isLogin){
    //     console.log("In will mount, goinf to login: ");
    //     console.log("token: ", token);
    //     console.log("login: ", this.props.login);
    //     browserHistory.push('/login');
    //   }
    //
    // }

    // componentDidMount() {
    //   var token = Auth.getToken();
    //   if(!token || token.trim()==""){
    //     browserHistory.push('/');
    //   }
    // }

    componentWillReceiveProps(nextProps) {
     
    }

    componentDidUpdate(prevProps, prevState) {
      console.log("In Component will receive props,  going to login: ");
      console.log("Login state: ", this.props.login);
      if(this.props.login.receivedResponse && !this.props.login.isLogin){
        browserHistory.push('/login');
      }
    }



   render() {

    if (this.state.open) {
      style.MainContentStyle.marginLeft = 230;
      style.ContentTitle.marginLeft =  250;
    }else{
      style.MainContentStyle.marginLeft = 70;
      style.ContentTitle.marginLeft =  70;

    }
    return(       
      <div className="mymain">         
        <div style={style.MainContentStyle}>
              <TopBar handleToggle = {this.handleToggle} open = {this.state.open} 
              logoutUser= {() => this.props.logoutUser()} />
        </div>
        <SideBarMenu handleToggle = {this.handleToggle} open = {this.state.open}
          user= {this.props.login.loginUser} isLogin= {this.props.login.isLogin}
        />   
        <div style={style.ContentTitle}>
          {this.props.children}  
        </div>
     
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
    logoutUser: () =>{
      dispatch(logoutUser());
    },
    checkLogin: () =>{
      dispatch(checkLogin());
    },
    setUrl: (path) =>{
      dispatch(setUrl(path));
    },
    setReceivedResponse: (value) => {
       dispatch(setReceivedResponse(value));
    } 
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);