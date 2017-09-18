import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})

/**
 * THUNK CREATORS
 */

export const fetchCart = (id) =>
  dispatch =>
    axios.get(`/api/users/${id}/cart`)
      .then(res => {
        dispatch(getCart(res.data))
      })
      .catch(err => console.log(err))

export const putCart = (updatedCart, id) =>
  dispatch =>
    axios.put(`/api/users/${id}/cart`, updatedCart)
      .then(res => {
        dispatch(updateCart(res.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return Object.assign([], state, action.cart)
    default:
      return state
  }
}
