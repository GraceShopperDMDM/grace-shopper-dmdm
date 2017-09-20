import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import allUsers from './allUsers'
import product from './product'
import reviews from './reviews'
import cart from './cart'
import orders from './order'
import order from './orders'

const reducer = combineReducers({user, allUsers, product, reviews, cart, orders, order})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allUsers'
export * from './product'
export * from './reviews'
export * from './cart'
export * from './orders'
export * from './order'
