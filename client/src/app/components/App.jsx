import React from 'react';
import SideBarMenu from './SideBarMenu.jsx';
import TopBar from './TopBar.jsx'; 
import Auth from './Auth.js';
import {checkLogin, logoutUser} from "./../actions/loginActions";
import {connect} from "react-redux";
import {Router, browserHistory} from 'react-router';


class App extends React.Component {

    constructor(props){
        super(props);
        this.handleToggle =  this.handleToggle.bind(this);
        this.state = {
          open: true,        
        };
    }
   
    handleToggle() { 
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

        this.props.checkLogin(config);

      }
    }



   render() {
    if(!this.props.login.isLogin){
        browserHistory.push('/');
    }
    const contentStyle = {
      marginLeft: 70 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' 
    };

    const centerContent = { marginTop:10, marginLeft: 250 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' };

    if (this.state.open) {
      contentStyle.marginLeft = 230;
    }

    return(       
      <div className="mymain">         
        <div style={contentStyle}>
              <TopBar handleToggle = {this.handleToggle} open = {this.state.open} 
              logoutUser= {() => this.props.logoutUser()} />
        </div>
        <SideBarMenu handleToggle = {this.handleToggle} open = {this.state.open}
          user= {this.props.login.loginUser} isLogin= {this.props.login.isLogin}
        />   
        <div style={centerContent}><h1>Student Management system</h1>
          {this.props.children}  
        </div>
     </div>
    );         
  }
}

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
    checkLogin: (config) =>{
      dispatch(checkLogin(config));
    } 
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);