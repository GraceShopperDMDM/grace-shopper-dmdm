import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SingleUser from './SingleUser'
import EditSingleUser from './EditSingleUser'
import UserReviews from './UserReviews'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {user} = props

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          {user.isAdmin &&
          <div className="row">
            <div className="col-lg-4">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <i className="fa fa-search fa-5x"></i>
                    </div>
                    {/* <div className="col-xs-6 text-right">
                      <p className="announcement-heading">1</p>
                      <p className="announcement-text">Users</p>
                    </div> */}
                  </div>
                </div>
                <Link to="/products">
                  <div className="panel-footer announcement-bottom">
                    <div className="row">
                      <div className="col-xs-6">
                        Products
                      </div>
                      <div className="col-xs-6 text-right">
                        <i className="fa fa-arrow-circle-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="panel panel-warning">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <i className="fa fa-user fa-5x"></i>
                    </div>
                    <div className="col-xs-6 text-right">
                      <p className="announcement-heading"></p>
                      <p className="announcement-text"></p>
                    </div>
                  </div>
                </div>
                <Link to="/users">
                  <div className="panel-footer announcement-bottom">
                    <div className="row">
                      <div className="col-xs-6">
                        Users
                      </div>
                      <div className="col-xs-6 text-right">
                        <i className="fa fa-arrow-circle-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-3">
              <div className="panel panel-danger">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <i className="fa fa-edit fa-5x"></i>
                    </div>
                    <div className="col-xs-6 text-right">
                      <p className="announcement-heading"></p>
                      <p className="announcement-text"></p>
                    </div>
                  </div>
                </div>
                <Link href={`users/2/reviews`}>
                  <div className="panel-footer announcement-bottom">
                    <div className="row">
                      <div className="col-xs-6">
                        Reviews
                      </div>
                      <div className="col-xs-6 text-right">
                        <i className="fa fa-arrow-circle-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div> */}
            <div className="col-lg-4">
              <div className="panel panel-success">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <i className="fa fa-gift fa-5x"></i>
                    </div>
                    <div className="col-xs-6 text-right">
                      <p className="announcement-heading"></p>
                      <p className="announcement-text"></p>
                    </div>
                  </div>
                </div>
                <Link to href={`users/${user.id}/orders`}>
                  <div className="panel-footer announcement-bottom">
                    <div className="row">
                      <div className="col-xs-6">
                        Orders
                      </div>
                      <div className="col-xs-6 text-right">
                        <i className="fa fa-arrow-circle-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          }
          <div className="card">
            <ul className="nav nav-tabs" role="tablist">
              {/* <li role="presentation" className="active">
                <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a>
              </li> */}
              <li role="presentation" className="active">
                <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a>
              </li>
              <li role="presentation">
                <a href="#reviews" aria-controls="reviews" role="tab" data-toggle="tab">Reviews</a>
              </li>
              <li role="presentation">
                <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a>
              </li>
            </ul>
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="profile"><SingleUser {...props} /></div>
              <div role="tabpanel" className="tab-pane" id="reviews"><UserReviews {...props}/></div>
              <div role="tabpanel" className="tab-pane" id="settings"><EditSingleUser {...props} /></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
