import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_CART = 'DELETE_CART'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})
const deleteCart = cart => ({type: DELETE_CART, cart})

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
    axios.put(`/api/users/${id}/cart`, {
      quantity: updatedCart.quantity,
      userId: id,
      chocolateId: updatedCart.id
    })
      .then(res => {
        console.log('here be data', res.data)
        dispatch(updateCart(res.data))
      })
      .catch(err => console.log(err))

export const deleteCartThunk = (cart, id) =>
  dispatch => {
    console.log('cart and id: ', cart, id)
    const chocolateId = cart.chocolateId
    axios.delete(`/api/users/${id}/cart/${chocolateId}`)
      .then(res => {
        console.log('deleted')
        dispatch(deleteCart(cart))
      })
      .catch(err => console.log(err))
  }

/**
 * REDUCER
 */
export default function (state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return Object.assign([], state, state.map(cart => (+cart.id === +action.cart.id && cart.chocolateId === action.cart.chocolateId) ? action.cart : cart))
    case DELETE_CART:
      return Object.assign([], state, state.map(cart => (+cart.id === +action.cart.id && cart.chocolateId === action.cart.chocolateId) ? {} : cart))
    default:
      return state
  }
}
