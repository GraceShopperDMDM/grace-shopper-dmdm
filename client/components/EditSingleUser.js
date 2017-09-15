import React from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store'

export const EditSingleUser = (props) => {
  const {users} = props
  if (props.users.length) {
    const user = users.find(user => +user.id === +props.match.params.id)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4" >
            <form className="panel panel-primary" onSubmit={props.handleSubmit}>
              <div className="panel-heading">Edit {user.username}</div>
              <div className="panel-body">
                <label>Username</label><input type='text' name="username"className='form-control' defaultValue={user.username} />
                <label>Email</label><input type='text' name="email" className='form-control' defaultValue={user.email} />
                <label>Address</label><input type='text' name="address" className='form-control' defaultValue={user.address} />
                <label>Password</label><input type='text' name="password" className='form-control' placeholder='Enter new password'/>
                <label>Administrator</label>
                {
                  user.isAdmin ? (
                    <select name="select">
                      <option defaultValue="True">True</option>
                      <option value="False">False</option>
                    </select>
                  ) : (
                    <select name="select">
                      <option value="True">True</option>
                      <option defaultValue="False">False</option>
                    </select>
                  )
                }
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

const mapState = (state) => {
  console.log('MAPSTATE', state)
  return {
    users: state.allUsers
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: function (event) {
      const id = ownProps.match.params.id
      const username = event.target.username.value
      const email = event.target.email.value
      const address = event.target.address.value
      const password = event.target.password.value
      const isAdmin = event.target.select.value
      event.preventDefault()
      console.log('UPDATED USER', {username, email, address, password, isAdmin})
      dispatch(updateUser({username, email, address, password, isAdmin}, id, ownProps.history))
    }
  }
}

export default connect(mapState, mapDispatch)(EditSingleUser)
