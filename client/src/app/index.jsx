import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom'; 
//import {connect} from 'react-redux'
//import {syncHistoryWithStore,routerReducer} from 'react-router-redux'
//import store from './store.jsx'
//import {Router, Route , browserHistory} from 'react-router'
import App from './components/App.jsx'; 

class Main extends React.Component {
    constructor(props){
        super(props)
        
    }
    componentWillReceiveProps(props){
       
        this.props= props
    }
    render(){

      console.log("Hello");
        return(
         <App />
            );
    }
}

injectTapEventPlugin();
  
render(  
 <Main />,
 document.getElementById('app')
);
