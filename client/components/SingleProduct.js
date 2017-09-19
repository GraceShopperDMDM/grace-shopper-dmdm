import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchReviews, putCart} from '../store'
import store, {submitUserReview} from '../store'
import ProductReviews from './ProductReviews'
import { history } from '../history'

export const SingleProduct = (props) => {
  const product = props.product[0] || {name: ''}
  const {handleAdd, user} = props
  product.quantity = 1
  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <ul className="preview-thumbnail nav nav-tabs">
                  <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={product.photo}/></a></li>
                </ul>
              </div>
              <div className="details col-md-6">

                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <h4 className="price">Price: <span>{product.price}</span></h4>
                <Link to={`/users/${user.id}/cart`} className="btn btn-primary" onClick={() => handleAdd(product, user.id)}>Add to Cart</Link>

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
        </div>
      </div>
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
      history.push(`/users/${id}/cart`)
    },
    SubmitReview: (e) => {
      e.preventDefault()
      const rating = e.target.rating.value
      const review = e.target.review.value
      const userId = e.target.userId.value
      dispatch(submitUserReview({stars: rating, body: review, chocolateId: +ownProps.match.params.id}, +userId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
