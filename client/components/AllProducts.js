import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import {fetchReviews} from '../store'

export const AllProducts = (props) => {
  const products = props.products
  console.log('PROPS', props)
  return (
    <div>
      {
        products.map(product =>
          <Link to={`/products/${product.id}`} key={product.id}>
            {product.name}
            <img src={product.photo} className="img img-responsive" />
          </Link>
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
