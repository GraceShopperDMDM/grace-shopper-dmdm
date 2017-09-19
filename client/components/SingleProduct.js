import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store, {fetchReviews, putCart} from '../store'
import ProductReviews from './ProductReviews'

export const SingleProduct = (props) => {
  const product = props.product[0] || {name: ''}
  const {handleAdd, user} = props
  console.log('product', product)
  product.quantity = 1
  return (
    <div className="container col-xs-3">
      <label>{product.name}</label>
      <img className="rounded img-fluid" src={product.photo} />
      <button onClick={() => handleAdd(product, user.id)}>Add to Cart</button>
      <ProductReviews {...props}/>
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    product: state.product.products.filter(product => product.id === +ownProps.match.params.id),
    reviews: state.reviews,
    user: state.user,
    productId: +ownProps.match.params.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleAdd: (cart, id) => {
      console.log('added', cart, id)
      cart.chocolateId = cart.id
      dispatch(putCart(cart, id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
