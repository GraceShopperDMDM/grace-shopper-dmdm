import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCart } from '../store'

class UserCart extends Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    this.props.loadCart()
  }

  render () {
    console.log('we are here!')
    const products = this.props.products
    const cartItems = this.props.cart || []
    console.log(cartItems)

    return (
      <div>
        <h3>My Cart</h3>
        <table>
          <tbody>
            <tr>
              <th>Remove</th>
              <th>Products</th>
              <th></th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {
              products.map(product =>
                <tr key={product.id}>
                  <td>
                    <button>Remove</button>
                  </td>
                  <td>
                    <img src={product.photo} />
                  </td>
                  <td>
                    <Link to={`/products/${product.id}`} key={product.id}>
                      {product.name}
                    </Link>
                  </td>
                  <td>
                    <input />
                  </td>
                  <td>
                    {product.price}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log('state', state)
  return {
    products: state.product.products,
    cart: state.cart
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadCart () {
      dispatch(fetchCart(ownProps.match.params.id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserCart)
