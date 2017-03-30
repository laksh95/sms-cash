import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Auth from './../Auth.js';
import {Router, browserHistory} from 'react-router'
import { connect } from 'react-redux'
import { getSession, getBatch, getCourse, getDepartment } from '../actions/adminActions.jsx'

  var style = {

     "titleStyle" : {
       color: "white"
     },

     "CurrentSessionElement":{
       backgroundColor: 'transparent',
       color: 'white',
       marginTop:12
     },

     "adminButton":{
        backgroundColor: 'transparent',
        color: 'white',
        marginLeft:0,
        marginTop:12
     },

     "settingsButton":{
        backgroundColor: 'transparent',
        color: 'white',
        marginTop:12
     },

     "logoutButton":{
        backgroundColor: 'transparent',
        color: 'white',
        marginLeft:0,
        marginTop:12
     }
  }

  var sessions = [
     "2013 - 2017",
     "2012 - 2016",
     "2011 - 2015",
     "2010 - 2014"
  ];

  var HANDLE_CODES = {
     "SETTINGS_OPEN" : "settingsOpen",
     "OPEN_CURRENT_SESSION": "openCurrentSession",
     "CLOSE_CURRENT_SESSION" : "closeCurrentSession",
     "LOGOUT_HANDLE":"handleLogout",
     "SETTINGS_CLOSE":"settingsClose"
  }


class TopBar extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      name: "Manipal University",
      open: false,
      currentSession : false,
      currentSessionValue : sessions[0]
    };
  }


  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }

  handleTouchTap = (item,event) => {

    switch(item){

      case HANDLE_CODES.SETTINGS_OPEN:
              event.preventDefault();
              this.setState({
               open: true,
               anchorEl: event.currentTarget,
              });
            break;

      case HANDLE_CODES.OPEN_CURRENT_SESSION:
               event.preventDefault();
               this.setState({
                  currentSession : true,
                  anchorEl: event.currentTarget,
               });
              break;

      case HANDLE_CODES.LOGOUT_HANDLE:
               browserHistory.push('/');
               Auth.deauthenticateUser();
               this.props.logoutUser();
              break;

      case HANDLE_CODES.SETTINGS_CLOSE:
               this.setState({
                 open: false,
               });
              break;

      case HANDLE_CODES.CLOSE_CURRENT_SESSION:
               this.setState({
                 currentSession: false,
                });
              break;
    }

  };

 render(){

     var allSessions = sessions.map(function(item , id){
       return (
          <MenuItem key={id} primaryText={item} />
        );
     });

    return(
      <AppBar
         title={
               <span  style={style.titleStyle} >
                    <center>
                        { this.state.name }
                     </center>
                </span>
               }

         iconElementLeft={
                  <span  style={style.myStyle} >
                      <FlatButton label={this.state.currentSessionValue} style={style.CurrentSessionElement} />
                  </span>
                }

         onLeftIconButtonTouchTap ={
                this.handleTouchTap.bind(this, HANDLE_CODES.OPEN_CURRENT_SESSION)
              }
       >
       <Popover


          open={this.state.currentSession}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleTouchTap.bind(this, HANDLE_CODES.CLOSE_CURRENT_SESSION)}
        >
           <Menu>
             {allSessions}
           </Menu>

        </Popover>

       <FlatButton label="Admin" style={style.adminButton} />
       <FlatButton label="Settings" style={style.settingsButton}
          onTouchTap={this.handleTouchTap.bind(this, HANDLE_CODES.SETTINGS_OPEN)}
       />
      <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleTouchTap.bind(this, HANDLE_CODES.SETTINGS_CLOSE)}
        >
          <Menu>
            <MenuItem primaryText="Edit Profile" />
            <MenuItem primaryText="Change Password" />
          </Menu>
        </Popover>

      <FlatButton label="Logout" style={style.logoutButton}
         onTouchTap={this.handleTouchTap.bind(this, HANDLE_CODES.LOGOUT_HANDLE)} />

  </AppBar>
);

}
}

TopBar.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };


const mapStateToProps = (state) => {
  return {
    adminReducer: state.adminReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getSession: () => {
        dispatch(getSession())
      },
      getBatch: (item) => {
        dispatch(getBatch(item))
      },
      getCourse: () => {
        dispatch(getCourse())
      },
      getDepartment: (item) => {
        dispatch(getDepartment(item))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);