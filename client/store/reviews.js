import axios from 'axios'

// action types
const GET_REVIEWS = 'GET_REVIEWS'
const GET_CURR_USER_REVIEWS = 'GET_CURR_USER_REVIEWS'
const GET_CURR_PROD_REVIEWS = 'GET_CURR_PROD_REVIEWS'
// initial state
const intialState = {
  reviews: [],
  currUserReviews: [],
  currProdReviews: []
}

// action creators
const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

const getCurrUserReviews = (currUserReviews) => {
  return {
    type: GET_CURR_USER_REVIEWS,
    currUserReviews
  }
}

const getCurrProdReviews = (currProdReviews) => {
  return {
    type: GET_CURR_PROD_REVIEWS,
    currProdReviews
  }
}

// thunk creators

export function fetchReviews (id) {
  return function thunk (dispatch) {
    return axios.get(`/api/products/${id}/reviews`)
      .then(res => res.data)
      .then(reviews => {
        dispatch(getReviews(reviews))
      })
      .catch(console.error)
  }
}

export function fetchCurrUserReviews (id) {
  return function thunk (dispatch) {
    return axios.get(`/api/users/${id}/reviews`)
      .then(res => res.data)
      .then(reviews => {
        dispatch(getCurrUserReviews(reviews))
      })
      .catch(console.error)
  }
}

export function fetchCurrProdReviews (id) {
  return function thunk (dispatch) {
    return axios.get(`/api/products/${id}/reviews`)
      .then(res => res.data)
      .then(reviews => {
        dispatch(getCurrProdReviews(reviews))
      })
      .catch(console.error)
  }
}

// reviews reducer

export default function reviewReducer (state = intialState, action) {
  // console.log(action)
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      }
    case GET_CURR_USER_REVIEWS:
      return {
        ...state,
        currUserReviews: action.currUserReviews
      }
    case GET_CURR_PROD_REVIEWS:
      return {
        ...state,
        currProdReviews: action.currProdReviews
      }
    default:
      return state
  }
}
