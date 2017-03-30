import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import {Link} from 'react-router'
import {Router, browserHistory} from 'react-router';
import Auth from './../../Auth.js';
import Snackbar from 'material-ui/Snackbar';

var style = {

  "cardTextStyle":{
    fontFamily: 'Roboto, sans-serif',
    color:'grey',
    marginLeft:'33%',
    fontSize: '23px'
  },

  "descriptionText":{
    marginTop:'4%',
    marginLeft:'0%',
    fontSize: '14px'
  },

  "loginButton":{
    fontFamily: 'Roboto, sans-serif',
    color:'grey',
    marginLeft:'30%',
    fontSize: '20px'
  }
}


 var HANDLE_CODES = {   
     "ON_LOGIN": "login",
     "PASSWORD_CHANGE":"passwordChange",
     "USERNAME_CHANGE":"textChange"
  }
export default class Login extends React.Component  {

  constructor(props) {
    super(props);

   this.state = {
      completed: 0,
      width: window.screen.availWidth,
      height: window.screen.availHeight,
      mobileView:false,
      errorText: '',
      errorTextPassword:'', 
      username:'',
      password:'',
      message:false,
      success:'false'
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
   }
  
  handleTouchTap = (item,event) => {
    switch(item){


      case HANDLE_CODES.ON_LOGIN:

        if( this.state.username != '' && this.state.password != '')
         {
           var bodyParameters = {
              "username": this.state.username,
              "password": this.state.password
            }

            this.props.loginUser(bodyParameters);
            
              }
               else{
                 this.setState({   message: true  });
               }

      break;
     case HANDLE_CODES.PASSWORD_CHANGE:
                this.setState({ password: event.target.value , errorTextPassword: '' });
              break;

    case HANDLE_CODES.USERNAME_CHANGE:
                this.setState({ username:event.target.value ,  errorText: '' });

              break;
    }
  
};


    updateDimensions() {

    this.setState({   message: false  });
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

       if(width > 760){
        this.setState({width: width, height: height, mobileView:false});
     }else{
        this.setState({width: width, height: height, mobileView:true});
      }
    }

  componentWillMount() {
    this.updateDimensions();
    this.setState({   message: false  });
    var token = Auth.getToken();
    
    if(token !=null){
      this.props.checkLogin();
    }
  }

    componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentDidMount() {
         this.setState({   message: false  });
        window.addEventListener("resize", this.updateDimensions);
    }

render() {
     let fixedWidth = window.screen.availWidth;
     let width = this.state.width;
     let positionCard = width/2 + width/8;
     let height = this.state.height;
     let fixedHeight = window.screen.availHeight;
     let completed =this.state.completed;
     let heightText = fixedHeight/2 ;
     let heightCard = fixedHeight/2 + fixedHeight/7;
     let visible = 'block';
     let textHeight = height/4;
     let cardWidth = fixedWidth/4;
     let sizeText = '31px';
     let textWidth = width/2;
     let centerPosition = 'left';

     
  if( this.state.mobileView === true)
   { 
    
      positionCard =width/4;
      visible = 'none';
      textHeight = height/4;
      sizeText = '18px';
      textHeight = height/30;
      textWidth = width/2 + width/3;
      heightCard = fixedHeight/2 - fixedHeight/10;
      centerPosition = 'center';
       cardWidth = width;
     
    }
    if(width < 600){

      positionCard =width/5;
    }
    if(width < 550){

      positionCard =width/7;
    }

  if( width < 461){

      textWidth = width/2 + width/10;
      positionCard =5;
      heightCard = fixedHeight/2 - fixedHeight/7;
      centerPosition = 'center';
   }

return(
    <div >
     
     <LinearProgress
       mode="determinate" 
       value={this.state.completed}
       style={{color:'grey', marginTop:'0.1%',height:'10px'}}
      />
   
     <div 
       style={
        { color:'grey',
          fontFamily: 'Roboto, sans-serif',
          height:heightText,
          width:textWidth,
          marginTop:textHeight,
          marginLeft:'5%'}
        }
      >

       <span
         style={
           {
            display: 'block',
            fontFamily:'Roboto, sans-serif',
            textAlign: centerPosition,
            fontSize: sizeText
           }
         }
        >

         <b>Welcome to the Student Management System</b>

      </span>
     
      < hr/>

       <span
         style={
            {
              display: visible
            }
          }
        >

       <div
        style={
           style.descriptionText 
         }
       >
      
         Now you can manage all your college activities through this application. Your feedback is extremely valuable to us. We hope you have an amazing time.
    
       </div>
     </span>

   </div>

     <Card
        style={
           {
             display:'block',
             align:centerPosition,
             width: fixedWidth/4,
             height:'400px',
             marginTop:-heightCard,
             marginLeft:positionCard
          }
        }
     >


      <CardHeader/>

      <CardText>
     
        <span style={style.cardTextStyle}>
          Login
        </span>
      
       <TextField
        hintText="Username"
        style={{marginTop:'10%'}}
        onChange={this.handleTouchTap.bind(this , HANDLE_CODES.USERNAME_CHANGE)}
       />
   
     
       <TextField
        hintText="Password"
        type="password"

        onChange={this.handleTouchTap.bind(this , HANDLE_CODES.PASSWORD_CHANGE)}

        style={{marginTop:'5%'}}
        />

        
        <span style={style.loginButton}>

          <RaisedButton
              label="Login"
              onTouchTap={this.handleTouchTap.bind(this, HANDLE_CODES.ON_LOGIN)}
              style={{marginTop:'5%'}}
           />
       </span>

      </CardText>
     </Card>

     <Snackbar
        open={this.state.message}
        message={"Please enter proper credentials"}
        autoHideDuration={5000}
        width={this.state.width}
     />
  </div>
  );
 }
}

Login.childContextTypes = {
       muiTheme: React.PropTypes.object.isRequired,
};
Login.contextTypes = {
   router: React.PropTypes.object.isRequired
};