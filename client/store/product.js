import axios from 'axios'

// action types
const GET_PRODUCTS = 'GET_PRODUCTS'

// initial state
const intialState = {
  products: []
}

// action creators
const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

// thunk creators

export function fetchProducts () {
  return function thunk (dispatch) {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        dispatch(getProducts(products))
      })
      .catch(console.error)
  }
}

// products reducer

export default function productReducer (state = intialState, action) {
  // console.log(action)
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    default:
      return state
  }
}
