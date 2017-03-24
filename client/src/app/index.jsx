import 'babel-polyfill' ;
import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import store from "./store.jsx"
import {Provider} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
const history = syncHistoryWithStore(browserHistory, store)
injectTapEventPlugin();
// ReactDOM.render(
//     <Provider store={store}>
//         <App />,
//         document.getElementById('main')
//     </Provider>
// );
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" component={App}/>
            </Router>
        </div>
    </Provider>
    , window.document.getElementById('main'));
