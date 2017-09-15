import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <a href="mail-compose.html" className="btn btn-danger btn-block btn-compose-email">Compose Email</a>
          <ul className="nav nav-pills nav-stacked nav-email shadow mb-20">
            <li className="active">
              <a href="#mail-inbox.html">
                <i className="fa fa-inbox"></i> Inbox  <span className="label pull-right">7</span>
              </a>
            </li>
            <li>
              <a href="#mail-compose.html"><i className="fa fa-envelope-o"></i> Send Mail</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-certificate"></i> Important</a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-file-text-o"></i> Drafts <span className="label label-info pull-right inbox-notification">35</span>
              </a>
            </li>
            <li><a href="#"> <i className="fa fa-trash-o"></i> Trash</a></li>
          </ul>
          <h5 className="nav-email-subtitle">More</h5>
          <ul className="nav nav-pills nav-stacked nav-email mb-20 rounded shadow">
            <li>
              <a href="#">
                <i className="fa fa-folder-open"></i> Promotions  <span className="label label-danger pull-right">3</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-folder-open"></i> Job list
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-folder-open"></i> Backup
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-9">
          <div className="row">
            <div className="col-lg-3">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <i className="fa fa-search fa-5x"></i>
                    </div>
                    <div className="col-xs-6 text-right">
                      <p className="announcement-heading">1</p>
                      <p className="announcement-text">Users</p>
                    </div>
                  </div>
                </div>
                <a href="#">
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
                </a>
              </div>
            </div>
            <div className="col-lg-3">
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
                <a href="#">
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
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-danger">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <i className="fa fa-edit fa-5x"></i>
                    </div>
                    <div className="col-xs-6 text-right">
                      <p className="announcement-heading">18</p>
                      <p className="announcement-text">Crawl</p>
                    </div>
                  </div>
                </div>
                <a href="#">
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
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-success">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <i className="fa fa-gift fa-5x"></i>
                    </div>
                    <div className="col-xs-6 text-right">
                      <p className="announcement-heading">56</p>
                      <p className="announcement-text"> Orders!</p>
                    </div>
                  </div>
                </div>
                <a href="#">
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
                </a>
              </div>
            </div>
          </div>
          <div className="card">
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active">
                <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a>
              </li>
              <li role="presentation">
                <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a>
              </li>
              <li role="presentation">
                <a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a>
              </li>
              <li role="presentation">
                <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a>
              </li>
            </ul>
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="home">
                <h2 className="page-header">Search Results</h2>
                <section className="comment-list">
                  <article className="row">
                    <div className="col-md-2 col-sm-2 hidden-xs">
                      <figure className="thumbnail">
                        <img className="img-responsive" src="http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg" />
                        <figcaption className="text-center">username</figcaption>
                      </figure>
                    </div>
                    <div className="col-md-10 col-sm-10">
                      <div className="panel panel-default arrow left">
                        <div className="panel-body">
                          <header className="text-left">
                            <div className="comment-user"><i className="fa fa-user"></i> That Guy</div>
                            <time className="comment-date" datetime="16-12-2014 01:05"><i className="fa fa-clock-o"></i> Dec 16, 2014</time>
                          </header>
                          <div className="comment-post">
                            <p>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <p className="text-right"><a href="#" className="btn btn-default btn-sm"><i className="fa fa-reply"></i> reply</a></p>
                        </div>
                      </div>
                    </div>
                  </article>
                </section>
              </div>
              <div role="tabpanel" className="tab-pane" id="profile">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
              <div role="tabpanel" className="tab-pane" id="messages">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
              <div role="tabpanel" className="tab-pane" id="settings">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage..</div>
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
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
