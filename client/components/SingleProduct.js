import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchReviews, putCart} from '../store'
import store, {submitUserReview} from '../store'
import ProductReviews from './ProductReviews'

export const SingleProduct = (props) => {
  const product = props.product[0] || {name: ''}
  const {handleAdd, user} = props
  product.quantity = 1
  console.log('props', props)
  return (
    <div>
      <div className="container col-xs-4">
        <label>{product.name}</label>
        <img className="rounded img-fluid" src={product.photo} />
        <button onClick={() => handleAdd(product, user.id)}>Add to Cart</button>
        <p>{product.description}</p>
      </div>
      <div className="container col-xs-8">
        <form onSubmit={props.SubmitReview}>
          <label>Rate This Product</label>
          <select name="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input readOnly name="userId" value={props.user.id} type="hidden"/>
          <label>Add Your Review</label>
          <textarea name="review" type="text" style= {{width: 500 + 'px', height: 100 + 'px'}} placeholder="Write Review" />
          <button className="btn btn-primary">Submit</button>
        </form>
        <h2>Product Reviews</h2>
        <ProductReviews {...props}/>
      </div>
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
    },
    SubmitReview: (e) => {
      e.preventDefault()
      const rating = e.target.rating.value
      const review = e.target.review.value
      const userId = e.target.userId.value
      console.log(userId, 'THIS IS USERID')
      dispatch(submitUserReview({stars: rating, body: review, chocolateId: +ownProps.match.params.id}, +userId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
