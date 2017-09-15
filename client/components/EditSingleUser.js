import React from 'react'
import {connect} from 'react-redux'

export const EditSingleUser = (props) => {
  const {users} = props
  const user = users.find(user => user === props.match.params.id)
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4" >
          <div className="panel panel-primary">
            <div className="panel-heading">Edit :</div>
            <div className="panel-body">
              <div align="right"><a href='#'><span className='glyphicon glyphicon-tasks'></span>Edit {user.username}</a></div>
              <label>Name</label><input type='text' className='form-control' value='just' disabled />
              <label>Last name : </label><input type='text' className='form-control' value='just' disabled />
              <label>Gender : </label><input type='text' className='form-control' value='just' disabled />
              <label>Street : </label><input type='text' className='form-control' value='just' disabled />
              <label>Email :</label><input type='text' className='form-control' value='just' disabled />
              <label>Number telephone :</label><input type='text' className='form-control' value='just' disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => {
  console.log('MAPSTATE', state)
  return {
    users: state.allUsers
  }
}

export default connect(mapState)(EditSingleUser)
