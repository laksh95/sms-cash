import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from "redux-promise-middleware"
import {routerReducer} from 'react-router-redux'
export default createStore(
    combineReducers({

    }),
    {
    },
    applyMiddleware(logger(),thunk , promise())
)