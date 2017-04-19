import React from 'react';
import SideBarMenu from './../components/SideBarMenu.jsx';
<<<<<<< HEAD
import TopBar from './TopBar.jsx';
import Auth from '../Auth.js';
import {checkLogin, logoutUser, setUrl,setReceivedResponse} from "./../actions/loginActions";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
let style = {

=======
import TopBar from './TopBar.jsx'; 
import Auth from '../Auth.js';
import {checkLogin, logoutUser} from "./../actions/loginActions";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';

let style = {
>>>>>>> course
   "MainContentStyle":{
         marginTop:-10,
         marginLeft: 70,
         marginRight:0,
         transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' 
   },
   "ContentTitle":{
       marginTop:10,
       marginLeft: 70,
       marginRight:0,
       transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' 
   }
}
class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          open: true,
          request: 'default'       
        };
    }
<<<<<<< HEAD
   
    handleToggle = (request) => { 
      this.setState({open: !this.state.open , request: request});
=======
    handleToggle = () => { 
      this.setState({open: !this.state.open});
>>>>>>> course
    }

    handleRequest = (request) => { 
      this.setState( {request: request});
    }
    componentWillMount() {
      var token = Auth.getToken();
<<<<<<< HEAD
      let path= this.props.location.pathname;

      this.props.setUrl(path);
      this.props.setReceivedResponse(false);
      
      if(token !== null){
        this.props.checkLogin();
      }
      else if(!this.props.login.isLogin){
        console.log("In will mount, goinf to login: ");
        console.log("token: ", token);
        console.log("login: ", this.props.login);
        browserHistory.push('/login');
=======
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
    componentDidMount() {
      if(!this.props.login.isLogin){
        browserHistory.push('/');
>>>>>>> course
      }

    }
    componentWillReceiveProps(nextProps) {
     
    }

     getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
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
<<<<<<< HEAD
      style.MainContentStyle.marginLeft = 220;
      style.ContentTitle.marginLeft =  224;
    }else{
      style.MainContentStyle.marginLeft = 60;
=======
      style.MainContentStyle.marginLeft = 230;
      style.ContentTitle.marginLeft =  250;
    }
    else{
      style.MainContentStyle.marginLeft = 70;
>>>>>>> course
      style.ContentTitle.marginLeft =  70;
    }
    var header = 
              <TopBar handleToggle = { (request) =>{ 
                this.handleToggle(request)}}  handleRequest = { (request) =>{ 
                this.handleRequest(request)}} open = {this.state.open} request = {this.state.request}
              logoutUser= {() => this.props.logoutUser()} /> ;

    var content = <span> 
          {this.props.children}  
           </span>;
             
    if(this.props.login.loginUser.name === undefined ){

          header =  <span></span>;
          content = <center><CircularProgress size={80} thickness={5} /> </center>; 
    }
    return(       
      <div className="mymain">   
          
        <div style={style.MainContentStyle}>
         {header}
         </div>
       
        <SideBarMenu handleToggle = {(request) => this.handleToggle(request)} open = {this.state.open}
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
<<<<<<< HEAD
    muiTheme: React.PropTypes.object.isRequired
}
App.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps= (state) => {
    return{
=======
    muiTheme: React.PropTypes.object.isRequired,
};
App.contextTypes = { 
    router: React.PropTypes.object.isRequired
};
const mapStateToProps= (state) => {
  return{
>>>>>>> course
        login: state.login,
        courseReducer: state.courseReducer
    };
};

const mapDispatchToProps= (dispatch) => {
  return{
    logoutUser: () =>{
      dispatch(logoutUser());
    },
<<<<<<< HEAD
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
=======
    checkLogin: (config) =>{
      dispatch(checkLogin(config));
    },
    setCourse : (course)=>{
     dispatch(setCourse(course))
    },
    setPagedCourse : (course)=>{
       dispatch(setPagedCourse(course))
    },
    setSnackbarOpen :(data)=>{
        dispatch(setSnackbarOpen(data))
    },
    setSnackbarMessage:(data)=>{
        dispatch(setSnackbarMessage(data))
    },
    setValue:(value)=>{
        dispatch(setValue(value))
    },
      setCourse : (course)=>{
          dispatch(setCourse(course))
      },
      setPagedCourse : (course)=>{
          dispatch(setPagedCourse(course))
      },
      setSnackbarOpen :(data)=>{
          dispatch(setSnackbarOpen(data))
      },
      setSnackbarMessage:(data)=>{
          dispatch(setSnackbarMessage(data))
      },
      setValue:(value)=>{
          dispatch(setValue(value))
      }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
>>>>>>> course
