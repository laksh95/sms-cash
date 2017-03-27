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
import axios from 'axios';
import Auth from './../Auth.js';
import Snackbar from 'material-ui/Snackbar';


export default class Login extends React.Component  {

  constructor(props) {
    super(props);
    const storedMessage = localStorage.getItem('successMessage');
 
     if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    let successMessage = '';
    this.componentWillMount = this.componentWillMount.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);   
    this.onChange = this.onChange.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
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
   

    updateDimensions() {
    this.setState({   message: false  });
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

       if(width > 760){
          
        console.log("width is : " + width + " Height : "+height);
        this.setState({width: width, height: height, mobileView:false});
     }else{
        this.setState({width: width, height: height, mobileView:true});
      }
    }

    componentWillMount() {
    this.updateDimensions();
    this.setState({   message: false  });
    var token = Auth.getToken();
    var authString = `bearer ${Auth.getToken()}`
    
   if(token !=null){
    console.log(token);
      var bodyParameters = {
          "username": "",
          "password": ""
         }

   axios.defaults.headers.get['Authorization'] = authString;
    axios.get( 
        'http://localhost:8084/api/check'
      ).then( ( response ) => {
        browserHistory.push('/dashboard');

        console.log(response.data.user);
        Auth.authenticateUser(response.data.token);
      } )
      .catch((response ) => {
             
      })
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


   onChange(event) {
    if (event.target.value.match("^[a-zA-Z0-9_-]{3,15}$")) {
      this.setState({ username:event.target.value ,  errorText: '' })
       } else 
       {
         this.setState({ username:event.target.value ,  errorText: 'Minimum 8 characters   Uppercase Alphabet or  Lowercase Alphabet or Numbers or hypher or underscore' });
      }
    }

    onPasswordChange(event) {

    if (event.target.value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$")) {
      this.setState({   password: event.target.value , errorTextPassword: '' });
       } else{
         this.setState({ password: event.target.value , errorTextPassword: 'Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number' })
       }
       
    }


    handleTouchTap() {
     if( this.state.errorText === '' && this.state.errorTextPassword === '' && this.state.username != '' && this.state.password != '')
       {
      
        var bodyParameters = {
          "username": this.state.username,
          "password": this.state.password
         }

     axios.post( 
      'http://localhost:8084/auth/login',
      
      bodyParameters


     ).then( ( response ) => {
           this.setState({
          completed: 100,
           });
        browserHistory.push('/dashboard');
        console.log(response.data.user);
        Auth.authenticateUser(response.data.token);
     })
     .catch( function(response ) {
                this.setState({   message: true  });  
     }.bind(this));
    
      }
     else{
       this.setState({   message: true  });
     }
 
 
  };


 getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
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
      <LinearProgress mode="determinate" value={this.state.completed} style={{color:'grey', marginTop:'0.1%',height:'10px'}}
      />
   
      <div style={{ color:'grey', fontFamily: 'Roboto, sans-serif' ,  height:heightText, width:textWidth , marginTop:textHeight, marginLeft:'5%'}}>

      <span style={{display: 'block' ,fontFamily: 'Roboto, sans-serif' ,textAlign: centerPosition, fontSize: sizeText}}><b>Welcome to the Student Management System</b></span>
     
      < hr/>

     <div style={{display: visible, marginTop:'4%' , marginLeft:'0%', fontSize: '14px'}}>Now you can manage all your college activities through this application. Your feedback is extremely valuable to us. We hope you have an amazing time.  </div>
     </div>

    <Card
    style={{ display:'block' ,align:centerPosition, width: fixedWidth/4, height:'400px' , marginTop:-heightCard, marginLeft:positionCard}}>
     <CardHeader   
     />
   
     <CardText>
     
        <span style={{fontFamily: 'Roboto, sans-serif' ,color:'grey', marginLeft:'33%', fontSize: '23px'}}>
          Login
        </span>
      
       <TextField
        hintText="Username"
        errorText= {this.state.errorText}
        onChange={this.onChange.bind(this)}
        style={{marginTop:'10%'}}
       />
   
     
       <TextField
        hintText="Password"
        hintText="Password"
        type="password"
        errorText= {this.state.errorTextPassword}
        onChange={this.onPasswordChange.bind(this)}
        style={{marginTop:'5%'}}
        />

        <br/><br/>
         <span style={{fontFamily: 'Roboto, sans-serif' ,color:'grey', marginLeft:'30%', fontSize: '20px'}}>

        <RaisedButton
            label="Login"
            onTouchTap={this.handleTouchTap}
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

