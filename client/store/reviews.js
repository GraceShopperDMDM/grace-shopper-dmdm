import axios from 'axios'

// action types
const GET_REVIEWS = 'GET_REVIEWS'

// initial state
const intialState = []

// action creators
const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
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

// reviews reducer

export default function reviewReducer (state = intialState, action) {
  // console.log(action)
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      }
    default:
      return state
  }
}
