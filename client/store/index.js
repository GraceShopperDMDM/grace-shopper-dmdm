import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import allUsers from './allUsers'
import product from './product'
import reviews from './reviews'

const reducer = combineReducers({user, allUsers, product, reviews})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allUsers'
export * from './product'
export * from './reviews'
