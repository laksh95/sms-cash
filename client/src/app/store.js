import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {routerReducer} from 'react-router-redux'
import blogReducer from './reducers/blogReducer.jsx'
import studentReducer from './reducers/studentReducer.jsx'
import headerReducer from './reducers/headerReducer.jsx'
import login from './reducers/loginReducer'
import departmentReducer from './reducers/departmentReducer.js'
import teacherReducer from './reducers/teacherReducer.jsx'
import subjectReducer from './reducers/subjectReducer.jsx'

export default createStore(
    combineReducers({
    	login,
    	headerReducer,
      blogReducer,
      studentReducer,
      teacherReducer,
      subjectReducer,
    	routing: routerReducer
    }),
    {},
    applyMiddleware(logger(),thunk , promise())
)
