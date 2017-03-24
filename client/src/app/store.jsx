import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from "redux-promise-middleware"
import {routerReducer} from 'react-router-redux'
const store=createStore(
    combineReducers({
        routing:routerReducer
    }),
    {
    },
    applyMiddleware(logger(),thunk , promise())
)
export default store