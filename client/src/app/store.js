import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {routerReducer} from 'react-router-redux'
import blogReducer from './reducers/blogReducer.js'
import headerReducer from './reducers/headerReducer.js'
import login from './reducers/loginReducer'
import departmentReducer from './reducers/departmentReducer.js'
import studentReducer from './reducers/studentReducer.js'
import errorReducer from './reducers/errorReducer.js'
import courseReducer from './reducers/courseReducer.js'
import subjectReducer from './reducers/subjectReducer.js'
import teacherReducer from './reducers/teacherReducer.js'
import getDataReducer from './reducers/getDataDashboardreducer.jsx'
export default createStore(
    combineReducers({
        login,
    	departmentReducer,
    	errorReducer,
        blogReducer,
    	routing: routerReducer,
        studentReducer,
        courseReducer,
    	headerReducer,
        getDataReducer,
        teacherReducer,
        subjectReducer,
    }),
    {},
    applyMiddleware(logger() ,thunk , promise())
)
