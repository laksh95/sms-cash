import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom'; 
import {connect} from 'react-redux'
import {syncHistoryWithStore,routerReducer} from 'react-router-redux'
//import store from './store.jsx'
import {Router, Route ,IndexRoute, browserHistory} from 'react-router'
import login from './components/App.jsx'; 
import sidebar from './components/Dashboard/App.jsx'; 
 
injectTapEventPlugin();
  
render(  
<Router history = {browserHistory}>
      <Route path = "/" component = {login}/>
      <Route path = "/dashboard" component = {sidebar} />  
   </Router>,
 document.getElementById('app')
);
