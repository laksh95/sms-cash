import React from 'react';
import TopBar from './TopBar.jsx'; 
import Login from './Login.jsx'; 
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

let loginStyle = require('./../../css/login.css');



export default class App extends React.Component {

  render() {
    return (
       <div className={loginStyle.mymain} >
         <TopBar />  
         <Login />         
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