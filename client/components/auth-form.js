import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
// import {SignUp} from './SignUp'
// import {LogIn} from './LogIn'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  if (name === 'signup') {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
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
            <button type='submit' className="btn btn-white btn-outline btn-lg btn-rounded">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href='/auth/google'>{displayName} with Google</a>
      </div>
    )
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          {/* <div>
            <label htmlFor='username'><small>UserName</small></label>
            <input className="form-control input-underline input-lg" name='username' type='text' />
          </div> */}
          <div>
            <label htmlFor='email'><small>Email</small></label>
            <input className="form-control input-underline input-lg" name='email' type='text' />
          </div>
          {/* <div>
            <label htmlFor='address'><small>Address</small></label>
            <input className="form-control input-underline input-lg" name='address' type='text' />
          </div> */}
          <div>
            <label htmlFor='password'><small>Password</small></label>
            <input className="form-control input-underline input-lg" name='password' type='password' />
          </div>
          <div>
            <button type='submit' className="btn btn-white btn-outline btn-lg btn-rounded">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href='/auth/google'>{displayName} with Google</a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    // handleLoginSubmit (evt) {
    //   evt.preventDefault()
    //   // const formName = evt.target.name
    //   const email = evt.target.email.value
    //   const password = evt.target.password.value
    //   dispatch(auth(email, password))
    // },
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const username = evt.target.username.value
        const address = evt.target.address.value
        console.log('user-->', email, password, formName, username, address)
        dispatch(auth(email, password, formName, username, address))
      } else if (formName === 'login') {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
