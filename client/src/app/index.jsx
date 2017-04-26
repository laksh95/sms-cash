import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route ,IndexRoute, browserHistory} from 'react-router'
import Login from './containers/login/App.jsx';
import App from './containers/App.jsx';
import Dashboard from './containers/Dashboard/App.jsx';
import Department from './containers/department/Department.jsx'
import Course from './containers/course/Course.jsx'
import Teacher from './containers/teacher/Teacher.jsx'
import AllTeacher from './containers/teacher/AllTeacher.jsx'
import AddTeacher from './containers/teacher/AddTeacher.jsx'
import Feedback from './containers/feedback/Feedback.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import Blog from './containers/blog/blog.jsx'
import Post from './containers/blog/post.jsx'
import Student from './containers/student/Student.jsx'
import ErrorApp from './containers/error/ErrorApp.jsx'

const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();
render((
	<Provider store={store}>
	   <Router history = {history}>
	      <Route path = "/" component = {App}>
	         <IndexRoute component = {Dashboard} />
	         <Route path = "/dashboard" component = {Dashboard} />
	         <Route path = "/department" component = {Department} />
					 <Route path = '/teacher/allTeacher' component = {AllTeacher} />
					 <Route path = '/teacher/addTeacher' component = {AddTeacher} />
					 <Route path = "/blog" component = {Blog} />
					 <Route path = "/course" component={Course} />
					 <Route path = "/student" component = {Student} />
					 
	         <Route path = "/blog/post/:postid" component = {Post} />
	         <Route path = "/teacher" component = {Teacher} />
			 	 	<Route path = "/feedback" component = {Feedback} />
			 	 	<Route path='*' component={ErrorApp} />
	      </Route>
	      <Route path = "/login" component = {Login}/>
	      <Route path = "/error" component = {ErrorApp}/>
	      <Route path='*' component={ErrorApp} />

	   </Router>
	</Provider>
), document.getElementById('app'))
