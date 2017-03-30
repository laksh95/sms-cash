import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {routerReducer} from 'react-router-redux'
import adminReducer from './reducers/adminReducer.jsx'
import login from './reducers/loginReducer'

export default createStore(
    combineReducers({
    	login,
    	adminReducer,
    	routing: routerReducer
    }),
    {},
    applyMiddleware(logger(),thunk , promise())
)

