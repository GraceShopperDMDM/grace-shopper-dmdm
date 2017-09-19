import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers, removeUser} from '../store'

class AllUsers extends React.Component {
  componentDidMount () {
    this.props.getAllUsers()
  }

  render () {
    let {users, user} = this.props
    if (users.length && user.isAdmin) {
      return (
        <div className="container">
          <div className="row">
            <div className="panel panel-default user_panel">
              <div className="panel-heading">
                <h3 className="panel-title">User List</h3>
              </div>
              <div className="panel-body">
                <div className="table-container">
                  <table className="table-users table">
                    <tbody>
                      {
                        users.map(user => {
                          return (
                            <div key={user.id + user.name}>
                              <Link to={`/users/${user.id}`}>
                                <tr>
                                  <td width="10">
                                    <i className="fa fa-2x fa-user fw"></i>
                                  </td>
                                  <td>
                                    {user.username}<br/>
                                    <i className="fa fa-envelope"></i>
                                  </td>
                                  <td>
                                    {user.isAdmin}
                                  </td>
                                  <td>
                                    Last Login:  6/14/2017<br /><small className="text-muted">2 days ago</small>
                                  </td>
                                </tr>
                              </Link>
                              <button value={user.id} className='btn btn-danger' onClick={this.props.deleteUser}>Delete</button>
                            </div>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (!user.isAdmin && !users.length) {
      return (
        <h3>Restricted Access</h3>
      )
    } else if (!users.length) {
    // console.log('PROPSUSER', props.user)
      if (!Object.keys(user).length) {
        return (
          <h3>Please log in or sign up</h3>
        )
      } else {
        return (
          <h3>Loading...</h3>
        )
      }
    }
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('MAPSTATE', state)
  return {
    users: state.allUsers,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(fetchUsers())
    },
    deleteUser: (e) => {
      dispatch(removeUser(e.target.value))
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
