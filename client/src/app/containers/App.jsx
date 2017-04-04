import React from 'react';
import SideBarMenu from './../components/SideBarMenu.jsx';
import TopBar from './TopBar.jsx'; 
import Auth from './../Auth.js';
import {checkLogin, logoutUser} from "./../actions/loginActions";
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

    componentWillMount() {
      var token = Auth.getToken();
      var authString = `bearer ${Auth.getToken()}`
      
      if(token !=null){

        //axios.defaults.headers.commons['Authorization'] = authString;
          let config = {
             headers: {
               'Authorization': authString
             }
          }

        this.props.checkLogin();

      }
    }

    componentDidMount() {
      if(!this.props.login.isLogin){
        browserHistory.push('/');
      }
    }

    componentWillReceiveProps(nextProps) {
       if(!this.props.login.isLogin){
        browserHistory.push('/');
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
    } 
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);