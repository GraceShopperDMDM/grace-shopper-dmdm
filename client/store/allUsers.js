import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const users = []

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const updateSingleUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */

export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res => {
        dispatch(getAllUsers(res.data))
      })
      .catch(err => console.log(err))

export const updateUser = (updatedUser, id, history) =>
  dispatch =>
    axios.put(`/api/users/${id}`, updatedUser)
      .then(res => {
        dispatch(updateSingleUser(res.data))
        history.push('/users')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = users, action) {
  console.log('STATE', state)
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case UPDATE_USER:
      return Object.assign([], state, state.map(user => +user.id !== +action.user.id ? user : action.user))
    default:
      return state
  }
}
