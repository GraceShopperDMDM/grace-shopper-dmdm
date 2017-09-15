import React from 'react'

const EditSingleUser = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4" >
          <div className="panel panel-primary">
            <div className="panel-heading">Edit :</div>
            <div className="panel-body">
              <div align="right"><a href='#'><span className='glyphicon glyphicon-tasks'></span>Edit ! </a></div>
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

export default EditSingleUser
