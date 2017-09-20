import axios from 'axios'

// action types
// const GET_REVIEWS = 'GET_REVIEWS'
const GET_CURR_USER_REVIEWS = 'GET_CURR_USER_REVIEWS'
const GET_CURR_PROD_REVIEWS = 'GET_CURR_PROD_REVIEWS'
const UPDATE_PROD_REVIEW = 'UPDATE_PROD_REVIEW'
const UPDATE_USER_REVIEW = 'UPDATE_USER_REVIEW'
const WRITE_USER_REVIEW = 'WRITE_USER_REVIEW'
const WRITE_PROD_REVIEW = 'WRITE_PROD_REVIEW'
const DELETE_USER_REVIEW = 'DELETE_USER_REVIEW'
const DELETE_PROD_REVIEW = 'DELETE_PROD_REVIEW'

// initial state
const intialState = {
  // reviews: [],
  currUserReviews: [],
  currProdReviews: []
}

// action creators
// const getReviews = (reviews) => {
//   return {
//     type: GET_REVIEWS,
//     reviews
//   }
// }

const getCurrUserReviews = (currUserReviews) => {
  return {
    type: GET_CURR_USER_REVIEWS,
    currUserReviews
  }
}

const deleteUserReview = reviewId => ({type: DELETE_USER_REVIEW, reviewId})

const deleteProdReview = (reviewId) => ({type: DELETE_PROD_REVIEW, reviewId})

const getCurrProdReviews = (currProdReviews) => {
  return {
    type: GET_CURR_PROD_REVIEWS,
    currProdReviews
  }
}

const writeUserReview = (review) => {
  return {
    type: WRITE_USER_REVIEW,
    review
  }
}

const writeProdReview = (review) => {
  return {
    type: WRITE_PROD_REVIEW,
    review
  }
}

const updateUserReview = (review) => {
  return {
    type: UPDATE_USER_REVIEW,
    review
  }
}

const updateProdReview = (review) => {
  return {
    type: UPDATE_PROD_REVIEW,
    review
  }
}

// thunk creators

// export function fetchReviews (id) {
//   return function thunk (dispatch) {
//     return axios.get(`/api/products/${id}/reviews`)
//       .then(res => res.data)
//       .then(reviews => {
//         dispatch(getReviews(reviews))
//       })
//       .catch(console.error)
//   }
// }

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

export function submitUserReview (review, userId) {
  return function thunk (dispatch) {
    return axios.post(`/api/users/${userId}/reviews`, review)
      .then(res => res.data)
      .then(review => {
        dispatch(writeUserReview(review))
        dispatch(writeProdReview(review))
      })
  }
}

export function EditReview (updatedReview, reviewId, history) {
  return function thunk (dispatch) {
    return axios.put(`/api/users/${updatedReview.userId}/reviews/${reviewId}`, updatedReview)
      .then(res => res.data)
      .then(updatedReview => {
        dispatch(updateUserReview(updatedReview))
        dispatch(updateProdReview(updatedReview))
      })
      .then(() => history.push(`/users/${updatedReview.userId}/reviews`))
  }
}

export const removeReview = (reviewId, userId, history) =>
  dispatch =>
    axios.delete(`/api/users/${userId}/reviews/${reviewId}`)
      .then(() => {
        dispatch(deleteProdReview(+reviewId))
        dispatch(deleteUserReview(+reviewId))
      })
      .then(() => history.push(`/users/${userId}/reviews`))
      .catch(err => console.log(err))

// reviews reducer

export default function reviewReducer (state = intialState, action) {
  switch (action.type) {
    // case GET_REVIEWS:
    //   return {
    //     ...state,
    //     reviews: action.reviews
    //   }
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
    case WRITE_USER_REVIEW:
      return Object.assign({}, state, state.currUserReviews.push(action.review))
    case WRITE_PROD_REVIEW:
      return Object.assign({}, state, state.currProdReviews.push(action.review))
    case UPDATE_USER_REVIEW:
      return Object.assign({}, state, state.currUserReviews.map(review => +review.id !== +action.review.id ? review : action.review))
    case UPDATE_PROD_REVIEW:
      return Object.assign({}, state, state.currProdReviews.map(review => +review.id !== +action.review.id ? review : action.review))
    case DELETE_USER_REVIEW:
      return Object.assign({}, state, state.currUserReviews.filter(review => +review.id !== +action.reviewId))
    case DELETE_PROD_REVIEW:
      return Object.assign({}, state, state.currProdReviews.filter(review => +review.id !== +action.reviewId))
    default:
      return state
  }
}
