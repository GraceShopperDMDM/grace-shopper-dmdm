import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_USER = 'UPDATE_USER'
const GET_SELF = 'GET_SELF'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const users = []

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const updateSingleUser = user => ({type: UPDATE_USER, user})
const getOneself = user => ({type: GET_SELF, user})
const deleteSingleUser = userId => ({type: DELETE_USER, userId})

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

export const getSelf = (id) =>
  dispatch =>
    axios.get(`/api/users/${id}`)
      .catch(err => console.log(err))

export const removeUser = (id) =>
  dispatch =>
    axios.delete(`/api/users/${id}`)
      .then(() => dispatch(deleteSingleUser(id)))
      .then(() => fetchUsers())
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
    case DELETE_USER:
      return Object.assign([], state, state.filter(user => +user.id !== +action.userId))
    default:
      return state
  }
}
