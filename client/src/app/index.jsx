/* eslint-disable import/default */
import 'babel-polyfill' ;
import React from 'react';  
import { render } from 'react-dom';  
import App from './app.jsx'; 
import{Provider} from "react-redux";
import {store} from "./store.js";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
render(  
	<Provider store={store} >
		<App />
	</Provider>,
	document.getElementById('main')
);
