import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom'; 
import {Provider} from 'react-redux'
import {syncHistoryWithStore,routerReducer} from 'react-router-redux'
import {Router, Route ,IndexRoute, browserHistory} from 'react-router'
import Login from './components/login/App.jsx'; 
import App from './components/App.jsx'; 
import Dashboard from './components/Dashboard/DashBoard.jsx'; 
import Department from './components/Department/Department.jsx'; 
import store from './store'

const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();
  
render((
	<Provider store={store}>
	   <Router history = {history}>
	      <Route path = "/" component = {Login}/>
	      <Route path = "/dashboard" component = {App}>
	         <IndexRoute component = {Dashboard} />	         
	         <Route path = "/department" component = {Department} />
	      </Route>
	   </Router>
	</Provider>
), document.getElementById('app'))


