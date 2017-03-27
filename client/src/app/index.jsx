import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom'; 
import {Provider} from 'react-redux'
import {syncHistoryWithStore,routerReducer} from 'react-router-redux'
import store from './store.js'
import {Router, Route ,IndexRoute, browserHistory} from 'react-router'
import Login from './components/login/App.jsx'; 
import App from './components/App.jsx'; 
import Dashboard from './components/Dashboard/DashBoard.jsx'; 
import Department from './components/Department/Department.jsx'; 
 
injectTapEventPlugin();
  
// render(  
// 	<Router history = {browserHistory}>
//       <Route path = "/" component = {login}/>
//       <Route path = "/dashboard" component = {sidebar} />  
//     </Router>,
//  document.getElementById('app')
// );


render((
	   <Router history = {browserHistory}>
	      <Route path = "/" component = {Login}/>
	      <Route path = "/dashboard" component = {App}>
	         <IndexRoute component = {Dashboard} />	         
	         <Route path = "/department" component = {Department} />
	      </Route>
	   </Router>
), document.getElementById('app'))
