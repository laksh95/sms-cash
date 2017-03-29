import React from 'react';
import TopBar from './TopBar.jsx'; 
import Login from './Login.jsx'; 
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
