/* eslint-disable import/default */
import 'babel-polyfill' ;
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
console.log('react component called')
render(
    <App />,
    document.getElementById('main')
);
