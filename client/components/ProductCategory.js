import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {AllProducts} from './AllProducts'

export const ProductCategory = (props) => {
  const products = props.products
  console.log('HERE', products)
  return (
    <AllProducts products={products} />
  )
}

const mapState = (state, ownProps) => {
  console.log('state', state)
  return {
    products: state.product.products.filter(prod => {
      return prod.category === ownProps.match.params.categoryName
    })
  }
}

export default connect(mapState)(ProductCategory)