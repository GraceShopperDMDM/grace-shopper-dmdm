import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const AllProducts = (props) => {
  const products = props.products
  // console.log('products', products)
  return (
    <div>
      {
        products.map(product =>
          <Link to={`/products/${product.id}`} key={product.id}>{product.name}</Link>
        )
      }
    </div>
  )
}

const mapState = (state) => {
  // console.log('state', state)
  return {
    products: state.product.products
  }
}

export default connect(mapState)(AllProducts)
