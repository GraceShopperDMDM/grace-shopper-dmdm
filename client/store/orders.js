import axios from 'axios'

/**
 * ACTION TYPES
 */
const ORDER_CART = 'ORDER_CART'

/**
 * INITIAL STATE
 */
const orders = []

/**
 * ACTION CREATORS
 */
const orderCart = cart => ({type: ORDER_CART, cart})

/**
 * THUNK CREATORS
 */
export const orderCartThunk = (cart, id) =>
  dispatch => {
    return axios.post(`/api/${id}/orders`, cart)
      .then(order => dispatch(orderCart(order)))
  }

/**
 * REDUCER
 */
export default function (state = orders, action) {
  switch (action.type) {
    case ORDER_CART:
      return Object.assign([], state, state.push(action.order))
    default:
      return state
  }
}
