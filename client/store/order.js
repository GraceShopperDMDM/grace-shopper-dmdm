import axios from 'axios'

// action types
const GET_ORDERS = 'GET_ORDERS'

// initial state
const intialState = []

// action creators
const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders
  }
}

// thunk creator
export function fetchUserOrders (id) {
  return function thunk (dispatch) {
    return axios.get(`/api/users/${id}/orders`)
      .then(res => res.data)
      .then(orders => {
        dispatch(getOrders(orders))
      })
      .catch(console.error)
  }
}

// order reducer
export default function orderReducer (state = intialState, action) {
  // console.log(action)
  switch (action.type) {
    case GET_ORDERS:
      return [...action.orders]
    default:
      return state
  }
}
