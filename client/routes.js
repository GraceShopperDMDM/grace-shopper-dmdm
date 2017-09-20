import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {
  Main,
  Login,
  Signup,
  UserHome,
  AllUsers,
  EditSingleUser,
  EditSingleReview,
  AllProducts,
  SingleProduct,
  ProductCategory,
  UserCart,
  UserReviews,
  UserOrderList
} from './components'
import {me, fetchUsers, fetchProducts} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main >
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/products' component={AllProducts} />
            <Route exact path='/products/:id' component={SingleProduct} />
            <Route path='/category/:categoryName' component={ProductCategory} />
            <Route path='/users/:id/cart' component={UserCart} />
            <Route exact path='/users/:id' component={EditSingleUser} />
            <Route exact path='/users' component={AllUsers} />
            <Route exact path='/users/:id/reviews' component={UserReviews} />
            <Route exact path='/users/:id/reviews/:reviewId' component={EditSingleReview} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path='/myhome' component={UserHome} />
                  <Route path='/users/:id/orders' component={UserOrderList} />
                  <Route component={AllProducts} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchUsers())
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
