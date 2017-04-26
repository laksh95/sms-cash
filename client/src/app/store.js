import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {routerReducer} from 'react-router-redux'
import blogReducer from './reducers/blogReducer.jsx'
import headerReducer from './reducers/headerReducer.jsx'
import login from './reducers/loginReducer'
import departmentReducer from './reducers/departmentReducer.js'
import studentReducer from './reducers/studentReducer.jsx'
import errorReducer from './reducers/errorReducer.jsx'
import courseReducer from './reducers/courseReducer.jsx'
import subjectReducer from './reducers/subjectReducer.jsx'
import teacherReducer from './reducers/teacherReducer.jsx'
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
        teacherReducer,
        getDataReducer,
        subjectReducer,
    }),
    {},
    applyMiddleware(logger(),thunk , promise())
)