import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const AllUsers = (props) => {
  if (props.users) {
    return (
      <div className="container">
        <div className="row">
          <div className="panel panel-default user_panel">
            <div className="panel-heading">
              <h3 className="panel-title">User List</h3>
            </div>
            <div className="panel-body">
              <div className="table-container">
                <table className="table-users table" border="0">
                  <tbody>
                    {
                      props.users.map(user => {
                        return (
                          <Link key={user.id} to={`/users/${user.id}`}>
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
  } else {
    return (
      <h3>Loading...</h3>
    )
  }
}

//       <div classNameName="container">
//         <h3>All Users</h3>
//         <br />
//         <br />
//         <ul classNameName="user-list">
//           {
//             props.users.map(user => {
//               return (
//                 <li key={user.id}>
//                   <Link to={`/users/${user.id}`}>{user.username}
//                   </Link>
//                 </li>
//               )
//             })
//           }
//         </ul>
//       </div>
//     )
//   } else {
//     return (
//       <h3>Loading...</h3>
//     )
//   }
// }

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
