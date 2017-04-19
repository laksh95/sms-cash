import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {routerReducer} from 'react-router-redux'
import adminReducer from './reducers/adminReducer.jsx'
import blogReducer from './reducers/blogReducer.jsx'
import login from './reducers/loginReducer'
import departmentReducer from './reducers/departmentReducer.js'
import studentReducer from './reducers/studentReducer.jsx'
export default createStore(
    combineReducers({
    	login,
    	adminReducer,
    	departmentReducer,
        blogReducer,
    	routing: routerReducer,
        studentReducer
    }),
    {},
    applyMiddleware(logger(),thunk , promise())
)

