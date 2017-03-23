import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {routerReducer} from 'react-router-redux'
import adminReducer from './reducers/adminReducer.jsx'

const store = createStore(
  combineReducers({adminReducer}),
  {} ,
  applyMiddleware(logger(),thunk, promise())
)

export default store
