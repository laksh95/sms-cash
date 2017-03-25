import React from 'react';
import TopBar from './TopBar.jsx'; 
import Login from './Login.jsx'; 
var a = require('./index.css');



export default class App extends React.Component {

  render() {
    console.log("Inside App");
    return (
       <div className={a.mymain} >
         <TopBar />  
         <Login />         
      </div>
    );
  }

  
}
