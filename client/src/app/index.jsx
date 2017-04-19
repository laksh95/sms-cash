import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route ,IndexRoute, browserHistory} from 'react-router'
import Login from './containers/login/App.jsx';
import App from './containers/App.jsx';
import Dashboard from './components/dashboard/DashBoard.jsx';
import Department from './containers/department/Department.jsx'
import Course from './containers/course/Course.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import Blog from './containers/blog/blog.jsx'
import Post from './containers/blog/post.jsx'
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
			  <Route path = "/blog" component = {Blog} />
			  <Route path = "/student" component = {Student} />
              <Route path = "/post/:postid" component = {Post} />
			  <Route path = "/course" component={Course} />
	      </Route>
	      <Route path = "/login" component = {Login}/>
	   </Router>
	</Provider>
), document.getElementById('app'))

