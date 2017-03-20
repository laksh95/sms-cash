/* eslint-disable import/default */
import 'babel-polyfill' ;
import React from 'react';  
import { render } from 'react-dom';  
import App from './app.jsx'; 
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
render(  
	<App />,
	document.getElementById('main')
);
