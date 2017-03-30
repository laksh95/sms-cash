import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from "redux-promise-middleware"
import {routerReducer} from 'react-router-redux'
import addBulkReducer from './reducers/addBulkStudentReducer'
const store=createStore(
    combineReducers({
        routing:routerReducer,
        addBulkStudent:addBulkReducer
    }),
    {
    },
    applyMiddleware(logger(),thunk, promise())
)
export default store