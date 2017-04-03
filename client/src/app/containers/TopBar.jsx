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
import { getInitialData , setCurrentSession , setCurrentCourse } from '../actions/headerActions.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

  var style = {

     "titleStyle" : {
       color: "white"
     },

     "CurrentSessionElement":{
       backgroundColor: 'transparent',
       color: 'white',
       marginTop:5
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

  var HANDLE_CODES = {
     "COURSE_OPEN" : "courseOpen",
     "OPEN_CURRENT_SESSION": "openCurrentSession",
     "CLOSE_CURRENT_SESSION" : "closeCurrentSession",
     "LOGOUT_HANDLE":"handleLogout",
     "COURSE_CLOSE":"courseClose"
  }

  const muiTheme = getMuiTheme({
  appBar: {
    height: 30,
    fontFamily: 'Roboto, sans-serif'
  },
});


class TopBar extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      name: "STUDENT MANAGEMENT SYSTEM",
      open: false,
      currentSession : false,
      currentSessionValue : this.props.adminReducer.selectedSession,
      Selectedcourse: this.props.adminReducer.selectedCourse,
      user: '',
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    };
  }


     updateDimensions = () =>{
    
    this.setState({   message: false  });
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

       if(width > 760){
        this.setState({width: width, height: height });
     }else{
        this.setState({width: width, height: height });
      }

      this.props.handleRequest('Topbar');
    }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps; 
     this.setState({
            user : this.props.loginReducer.loginUser.name
              });

      let width = this.state.width;
      let height = this.state.height;

      if(this.props.request === 'Topbar'){
       if(width <=800){
        if(this.props.open === true){
           this.props.handleToggle('Topbar');
         }
        }else{
          if(this.props.open === false){
            this.props.handleToggle('Topbar');
          }
        }
      }
  }


    componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions);
    }



  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }


     componentWillMount() {
      this.updateDimensions();
     this.props.getInitialData();

  }

  handleTouchTap = (item,event) => {

    switch(item){

      case HANDLE_CODES.COURSE_OPEN:
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
               Auth.deauthenticateUser();
               this.props.logoutUser();
              break;

      case HANDLE_CODES.COURSE_CLOSE:
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
      let that = this;
      var allSessions = this.props.adminReducer.initialData.batch.map(function(item , id){
       return (
          <MenuItem key={id} primaryText={item.name} 
           onTouchTap={ () => {
          that.props.setCurrentSession(item.name);
          that.handleTouchTap.bind(that, HANDLE_CODES.CLOSE_CURRENT_SESSION);
         }
       }
           />
        );
     });

       var allcourses = this.props.adminReducer.initialData.course.map(function(item , id){

       return (
          <MenuItem key={id} primaryText={item.name}
           onTouchTap={ () => {
               that.props.setCurrentCourse(item.name);
               that.handleTouchTap.bind(that, HANDLE_CODES.COURSE_CLOSE)
           } 
         } 
       />
        );
     });

   


  return(

        <div>
        
        <AppBar

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

       <FlatButton label={this.props.adminReducer.selectedCourse} style={style.settingsButton}
          onTouchTap={this.handleTouchTap.bind(this, HANDLE_CODES.COURSE_OPEN)}
       />
      <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleTouchTap.bind(this, HANDLE_CODES.COURSE_CLOSE)}
        >
          <Menu>
            {allcourses}
          </Menu>
        </Popover>

      <FlatButton label={this.state.user} style={style.adminButton} />

      <FlatButton label="Logout" style={style.logoutButton}
         onTouchTap={this.handleTouchTap.bind(this, HANDLE_CODES.LOGOUT_HANDLE)} />

      </AppBar>
     <MuiThemeProvider muiTheme={muiTheme}>
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
                     
                  </span>
                }
       ></AppBar>
    </MuiThemeProvider >
    </div>
    
);

}
}

TopBar.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };


const mapStateToProps = (state) => {
  return {
    adminReducer: state.adminReducer,
    loginReducer : state.login
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
      },
      getInitialData : (config) => {
       dispatch(getInitialData(config));
     },
       setCurrentCourse : (item) => {
       dispatch(setCurrentCourse(item));
     },
      setCurrentSession : (item) => {
       dispatch(setCurrentSession(item));
     }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);