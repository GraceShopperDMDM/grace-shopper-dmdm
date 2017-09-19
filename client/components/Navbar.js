import React from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component {
  // const {handleClick, isLoggedIn, user, products} = props

  constructor () {
    super();
    this.state = {
      input_text: '',
      current_id: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
    handleChange (e) {
      this.state.input_text = e.target.value
      this.props.products.forEach(product =>{
        if(product.name === this.state.input_text) {
            console.log(product.id)
            this.setState({current_id: product.id})
          }        
      })

    }

    handleSubmit () {
      this.props.products.forEach(product => {
        if(product.name === this.state.input_text) {
          console.log(product.id)
          return product.id
        }
      })
    }




  render(){

    let el = this.handleSubmit();


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
              <input type="text" className="form-control" placeholder="Search" name="q" onChange={this.handleChange}/>
              <div className="input-group-btn">
                <Link className="btn btn-default" type="submit" to={`/products/${this.state.current_id}`}><i className="glyphicon glyphicon-search"></i></Link>
              </div>
            </div>
          </form>
        </div>
        <ul className="nav navbar-nav navbar-right">
          {
            !this.props.isLoggedIn && <li><Link to="/login">LogIn</Link></li>
          }
          {
            !this.props.isLoggedIn && <li><Link to="/signup">SignUp</Link></li>
          }
          {
            this.props.isLoggedIn && (
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Account <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  <li><Link to="/myhome">Home</Link></li>
                  <li><Link to={`/users/${this.props.user.id}/cart`}>Cart</Link></li>
                  <li><Link to="#">My Orders</Link></li>
                  <li><Link to={`/users/${this.props.user.id}/reviews`}>My Reviews</Link></li>
                  <li className="divider"></li>
                  <li><Link onClick={this.props.handleClick} to="/logout">Logout</Link></li>
                </ul>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  )}
}
