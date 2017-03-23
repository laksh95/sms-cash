/* eslint-disable import/default */
import 'babel-polyfill' ;
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App.jsx';
import store from './store.jsx'
import Teacher  from './containers/Teacher.jsx'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

injectTapEventPlugin();

render(
  <Provider store={store}>
  	<Router history={browserHistory}>
  		<Route path="/" component= {App} />
  		<Route path="/teacher" component= {Teacher} />
  	</Router>
  </Provider>,
  document.getElementById('main')
)
