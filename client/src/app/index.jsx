import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom';
import {syncHistoryWithStore,routerReducer} from 'react-router-redux'
import {Router, Route ,IndexRoute, browserHistory} from 'react-router'
import App from './containers/App.jsx';
import { Provider } from 'react-redux'
import store from './store.js'
import Teacher from './containers/teacher/Teacher.jsx'
injectTapEventPlugin();


render((
 <Provider store={store}>
       <Router history = {browserHistory}>
          <Route path = "/" component = {App}>
             <Route path = "/teacher" component = {Teacher} />
          </Route>
       </Router>
 </Provider>
), document.getElementById('app'))
