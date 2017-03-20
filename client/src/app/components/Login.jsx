import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';


export default class Login extends React.Component  {

  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      completed: 0,
    };
  }



    handleTouchTap() {
   console.log("Hello");
    this.setState({
      completed: 100,
 
    });
  };


 getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }
  

render() {
  let width = window.screen.availWidth;
  let completed =this.state.completed;


return(
  
 <div>
    <LinearProgress mode="determinate" value={this.state.completed} style={{color:'grey', marginTop:'0.1%'}}

   />
    <div
      style={{color:'grey', fontFamily: 'Roboto, sans-serif' ,  height:'50%', width: '50%' , marginTop:'11%', marginLeft:'5%'}}>
     
      <span style={{fontFamily: 'Roboto, sans-serif' , fontSize: '31'}}>Welcome to the Student Management &nbsp; System of Manipal University</span>
         < hr/>
        <div style={{marginTop:'4%' , marginLeft:'0%', fontSize: '14'}}>Now you can manage all your college activities through this application. Your feedback is extremely valuable to us. We hope you have an amazing time.  </div>


    </div>
    <Card
    style={{width: '24%', height:'400px' , marginTop:'-22%', marginLeft:'69%'}}>
    <CardHeader
      title=""
      subtitle=""
    
    />
   
    <CardText>
     
        <span style={{fontFamily: 'Roboto, sans-serif' ,color:'grey', marginLeft:'33%', fontSize: '23'}}>
          Login
        </span>
      <br/><br/>
       <TextField
      hintText="Username"
    
    />

      <br/><br/>
       <TextField
      hintText="Password Field"
      hintText="Password"
      type="password"
    />
        <br/><br/>  <br/>
    <span style={{fontFamily: 'Roboto, sans-serif' ,color:'grey', marginLeft:'30%', fontSize: '28'}}>
      <RaisedButton label="Login" onTouchTap={this.handleTouchTap}/> 
    </span>
    </CardText>
  </Card>
</div>
);
}
}
Login.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

