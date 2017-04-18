import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {routerReducer} from 'react-router-redux'
import adminReducer from './reducers/adminReducer.jsx'
import login from './reducers/loginReducer'
import departmentReducer from './reducers/departmentReducer.js'
import teacherReducer from './reducers/teacherReducer.jsx'
import subjectReducer from './reducers/subjectReducer.jsx'
import feedbackReducer from './reducers/feedbackReducer.jsx'

export default createStore(
    combineReducers({
    	login,
    	adminReducer,
    	departmentReducer,
      teacherReducer,
      subjectReducer,
      feedbackReducer,
    	routing: routerReducer
    }),
    {},
    applyMiddleware(logger(),thunk , promise())
)
