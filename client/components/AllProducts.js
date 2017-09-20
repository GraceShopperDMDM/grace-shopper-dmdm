import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import {fetchReviews} from '../store'

export const AllProducts = (props) => {
  const products = props.products
  console.log('PROPS', props)
  return (
    <div className="row">
      {
        products.map(product =>
          <div className="col-xs-6 col-md-3">
            <Link to={`/products/${product.id}`} key={product.id} className="thumbnail">
              <img src={product.photo} className="img img-responsive" />
              {product.name}
            </Link>
          </div>
        )
      }
    </div>
  )
}

const mapState = (state) => {
  console.log('state', state)
  return {
    products: state.product.products
  }
}

export default connect(mapState)(AllProducts)
