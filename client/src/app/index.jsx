import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route ,IndexRoute, browserHistory} from 'react-router'
import Login from './containers/login/App.jsx';
import App from './containers/App.jsx';
import Dashboard from './components/dashboard/DashBoard.jsx';
import Department from './containers/department/Department.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import Student from './containers/student/Student.jsx'
const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();
render((
	<Provider store={store}>
	   <Router history = {history}>	      
	      <Route path = "/" component = {App}>
	         <IndexRoute component = {Dashboard} />
	         <Route path = "/dashboard" component = {Dashboard} />	         
	         <Route path = "/department" component = {Department} />
			  <Route path="/student" component={Student} />
	      </Route>
	      <Route path = "/login" component = {Login}/>
	   </Router>
	</Provider>
), document.getElementById('app'))

	
