import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const user = {}

/**
 * ACTION CREATORS
 */
const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */

export const updateSingleUser = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res => {
        dispatch(getAllUsers(res.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = users, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
