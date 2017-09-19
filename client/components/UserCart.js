import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCart, deleteCartThunk } from '../store'

class UserCart extends Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    this.props.loadCart()
  }

  render () {
    const products = this.props.products
    const cartItems = this.props.cart || []
    const handleRemove = this.props.handleRemove
    const user = this.props.user

    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i].chocolate = products.find(product => {
        // console.log(cartItems[i].chocolateId)
        // console.log(product.id)
        return +product.id === +cartItems[i].chocolateId
      })
    }
    // console.log(cartItems)

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
              <th>Price</th>
              <th>Total</th>
            </tr>
            {
              cartItems.map(cartItem =>
                <tr key={cartItem.chocolate.id}>
                  <td>
                    <button onClick={() => handleRemove(cartItem, user.id)}>
                      Remove
                    </button>
                  </td>
                  <td>
                    <img src={cartItem.chocolate.photo} />
                  </td>
                  <td>
                    <Link to={`/cartItem.chocolates/${cartItem.chocolate.id}`} key={cartItem.chocolate.id}>
                      {cartItem.chocolate.name}
                    </Link>
                  </td>
                  <td>
                    {cartItem.quantity}
                  </td>
                  <td>
                    {cartItem.chocolate.price}
                  </td>
                  <td>
                    {cartItem.chocolate.price * cartItem.quantity}
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
  // console.log('state', state)
  return {
    products: state.product.products,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadCart () {
      dispatch(fetchCart(ownProps.match.params.id))
    },
    handleRemove (cart, userId) {
      dispatch(deleteCartThunk(cart, userId))
      dispatch(fetchCart(ownProps.match.params.id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserCart)
