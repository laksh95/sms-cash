import {createStore,combineReducers,applyMiddleware} from "redux";
import{browserHistory} from 'react-router';
import thunk from "redux-thunk"
import data from "./reducers/getDataReducer.jsx";
import promise from "redux-promise-middleware";

export const store= createStore(combineReducers({data}),
	{},
    applyMiddleware(thunk,promise())
    );