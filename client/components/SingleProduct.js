import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store, {fetchReviews} from '../store'

export const SingleProduct = (props) => {
  const product = props.product[0] || {name: ''}
  return (
      <div className="container">
    <div className="card">
      <div className="container-fliud">
        <div className="wrapper row">
          <div className="preview col-md-6">
            
            <div className="preview-pic tab-content">
              <div className="tab-pane active" id="pic-1"><img src="http://placekitten.com/400/252" /></div>
              <div className="tab-pane" id="pic-2"><img src="http://placekitten.com/400/252" /></div>
              <div className="tab-pane" id="pic-3"><img src="http://placekitten.com/400/252" /></div>
              <div className="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
              <div className="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div>
            </div>
            <ul className="preview-thumbnail nav nav-tabs">
              <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={product.photo}/></a></li>
            </ul>
            
          </div>
          <div className="details col-md-6">
            <h3 className="product-title">{product.name}</h3>
            <div className="rating">
              <div className="stars">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>
              <span className="review-no">41 reviews</span>
            </div>
            <p className="product-description">{product.description}</p>
            <h4 className="price">Price: <span>{product.price}</span></h4>
            <Link className="add-to-cart btn btn-default" to={`/users/${product.id}/cart`}>Add to Cart</Link>
            <div className="action">
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
     productId: +ownProps.match.params.id
  }
}

export default connect(mapState)(SingleProduct)


