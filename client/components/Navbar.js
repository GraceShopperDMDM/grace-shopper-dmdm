import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar (props) {
  const {handleClick, isLoggedIn, user} = props
  return (
    <nav className="navbar navbar-default" role="navigation">

      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link className="navbar-brand" to="/">Chocolate Shop</Link>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="/products">Products</Link></li>
          {/* <li><Link href="#"></Link></li> */}
        </ul>
        <div className="col-sm-3 col-md-3">
          <form className="navbar-form" role="search">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" name="q" />
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-3 col-md-3">
          <form className="navbar-form" role="categories">
            <div className="input-group">
              <select className="form-control" onChange={handleChange}>
                <option value="products">All</option>
                <option value="new">New</option>
                <option value="what">Maybe</option>
              </select>
            </div>
          </form>
        </div>
        <ul className="nav navbar-nav navbar-right">
          {
            !isLoggedIn && <li><Link to="/login">LogIn</Link></li>
          }
          {
            !isLoggedIn && <li><Link to="/signup">SignUp</Link></li>
          }
          {
            isLoggedIn && (
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Account <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  <li><Link to="/myhome">Home</Link></li>
                  <li><Link to={`/users/${user.id}/cart`}>Cart</Link></li>
                  <li><Link to="#">My Orders</Link></li>
                  <li><Link to={`/users/${user.id}/reviews`}>My Reviews</Link></li>
                  <li className="divider"></li>
                  <li><Link onClick={handleClick} to="/logout">Logout</Link></li>
                </ul>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

function handleChange(e){
  console.log('hit')
}
