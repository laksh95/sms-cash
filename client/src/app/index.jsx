/* eslint-disable import/default */
import 'babel-polyfill' ;
import React from 'react';
import ReactDOM from 'react-dom'
import App from './containers/App.jsx';
import {Provider} from 'react-redux'
import Student from './containers/student/Student.jsx'
import Course from './containers/Course.jsx'
import {Router, Route,IndexRoute, browserHistory} from 'react-router'
import store from './store.jsx'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(<Provider store={store}>
       <Router history={history}>
           <Route path="/" component={App}>
               <Route path="/student" component={Student} />
               <Route path="/course" component={Course} />
           </Route>
       </Router>
    </Provider>
,
    document.getElementById('main')
);
