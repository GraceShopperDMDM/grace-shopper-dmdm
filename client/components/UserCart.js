import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCart, deleteCartThunk, putCart, orderCartThunk } from '../store'

class UserCart extends Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    this.props.loadCart()
  }

  render () {
    const cartItems = this.props.cart || []
    const {user, products, handleRemove, handleChange, handleCheckout} = this.props

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
                    <button className="btn btn-primary" onClick={() => handleRemove(cartItem, user.id)}>
                      Remove
                    </button>
                  </td>
                  <td>
                    <img src={cartItem.chocolate.photo} />
                  </td>
                  <td>
                    <Link to={`/products/${cartItem.chocolate.id}`} key={cartItem.chocolate.id}>
                      {cartItem.chocolate.name}
                    </Link>
                  </td>
                  <td>
                    <input defaultValue={cartItem.quantity} onChange={(evt) => handleChange(evt, cartItem, user.id)} />
                  </td>
                  <td>
                    {cartItem.chocolate.price}
                  </td>
                  <td>
                    {+(cartItem.chocolate.price * cartItem.quantity).toFixed(2)}
                  </td>
                </tr>
              )
            }
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Cart Total: </th>
              <th>{tally(cartItems)}</th>
            </tr>
          </tbody>
        </table>
        <button value={cartItems} onClick={handleCheckout} className="btn btn-default">Checkout</button>
      </div>
    )
  }
}

const tally = (items) => {
  let result = 0
  for (let j = 0; j < items.length; j++) {
    result += items[j].chocolate.price * items[j].quantity
  }
  return +result.toFixed(2)
}

const mapState = (state) => {
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
    },
    handleChange (e, cart, userId) {
      cart.quantity = +e.target.value
      console.log('target?', cart, userId)
      dispatch(putCart(cart, userId))
    },
    handleCheckout (e) {
      dispatch(orderCartThunk(e.target.value, ownProps.match.params.id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserCart)
