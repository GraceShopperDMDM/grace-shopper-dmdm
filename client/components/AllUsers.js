import React from 'react'
import SingleUser from './SingleUser'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const AllUsers = (props) => {
  if (props.users) {
    return (
      <div className="container">
        <h3>All Users</h3>
        <br />
        <br />
        <ul className="user-list">
          {
            props.users.map(user => {
              return (
                <li key={user.id}>
                  <Link to={`/users/${user.id}`}>{user.username}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  } else {
    return (
      <h3>Loading...</h3>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('MAPSTATE', state)
  return {
    users: state.allUsers
  }
}

export default connect(mapState)(AllUsers)
