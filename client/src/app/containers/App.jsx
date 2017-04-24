import React from 'react';
import SideBarMenu from './../components/SideBarMenu.jsx';
import TopBar from './TopBar.jsx';
import Auth from '../Auth.js';
import {checkLogin, logoutUser, setUrl,setReceivedResponse} from "./../actions/loginActions";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
let style = {
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
    handleToggle = (request) => {
      this.setState({open: !this.state.open , request: request});
    }

    handleRequest = (request) => {
      this.setState( {request: request});
    }
    componentWillMount() {
      console.log("In APP compo ====================");
      var token = Auth.getToken();
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
      }

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
      style.MainContentStyle.marginLeft = 220;
      style.ContentTitle.marginLeft =  224;
    }else{
      style.MainContentStyle.marginLeft = 60;
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
    <MuiThemeProvider>
      <div className="mymain">

        <div style={style.MainContentStyle}>
         {header}
         </div>

        <SideBarMenu handleToggle = {(request) => this.handleToggle(request)} open = {this.state.open}
          user= {this.props.login.loginUser} isLogin= {this.props.login.isLogin} prevPathName= {this.props.login.prevPathName}

        />
        <div style={style.ContentTitle}>
          {this.props.children}
        </div>

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
        courseReducer: state.courseReducer
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
