import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const AllProducts = (props) => {
  const products = props.products
  return (
    <div>
      {
        products.map(product =>
          <Link to={`/products/${product.id}`} key={product.id}>
            {product.name}
            <img src={product.photo} />
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
