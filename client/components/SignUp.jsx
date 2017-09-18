import React from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {auth} from '../store'

/**
 * COMPONENT
 */
export const SignUp = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit} name={props.name}>
        <div>
          <label htmlFor='username'><small>UserName</small></label>
          <input className="form-control input-underline input-lg" name='username' type='text' />
        </div>
        <div>
          <label htmlFor='email'><small>Email</small></label>
          <input className="form-control input-underline input-lg" name='email' type='text' />
        </div>
        <div>
          <label htmlFor='address'><small>Address</small></label>
          <input className="form-control input-underline input-lg" name='address' type='text' />
        </div>
        <div>
          <label htmlFor='password'><small>Password</small></label>
          <input className="form-control input-underline input-lg" name='password' type='password' />
        </div>
        <div>
          <button type='submit' className="btn btn-white btn-outline btn-lg btn-rounded">{props.displayName}</button>
        </div>
        {props.error && props.error.response && <div> {props.error.response.data} </div>}
      </form>
      <a href='/auth/google'>{props.displayName} with Google</a>
    </div>
  )
}
