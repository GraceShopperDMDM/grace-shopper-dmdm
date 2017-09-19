import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './Navbar'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children} = props
  console.log('===>', props)
  return (
    <div>
      <h1>COCO's Chocolate LoveShack</h1>
      {/* <nav className="navbar navbar-inverse bg-primary">
        <Link to='/products'>Products</Link>
        {
          isLoggedIn
            ? <div> */}
              {/* The navbar will show these links after you log in */}
              {/* <Link to='/myhome'>Home</Link>
              <a href='#' onClick={handleClick}>Logout</a>
            </div>
            : <div> */}
              {/* //The navbar will show these links before you log in */}
              {/* <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
              <input className=""/>
              <button className="btn btn-primary">Search:</button>
            </div>
        }

      </nav> */}
      <Navbar {...props}/>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    products: state.product.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
