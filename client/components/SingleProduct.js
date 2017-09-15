import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const SingleProduct = (props) => {
  const product = props.product[0] || {name: ''}
  console.log('product', product)
  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.photo} />
    </div>
  )
}

const mapState = (state, ownProps) => {
  console.log('state', state)
  return {
    product: state.product.products.filter(product => product.id === +ownProps.match.params.id)
  }
}

export default connect(mapState)(SingleProduct)