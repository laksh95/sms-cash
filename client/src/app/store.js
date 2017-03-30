import {createStore,combineReducers,applyMiddleware} from 'redux'
import adminReducer from './reducers/adminReducer.jsx'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import login from './reducers/loginReducer'
import addBulkReducer from './reducers/addBulkStudentReducer'
import {routerReducer} from 'react-router-redux'
export default createStore(
    combineReducers({
    	login,
    	adminReducer,
    	routing: routerReducer,
        addBulkStudent:addBulkReducer
    }),
    {},
    applyMiddleware(logger(),thunk , promise())
)

