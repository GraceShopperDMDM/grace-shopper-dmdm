import React from 'react'
import {connect} from 'react-redux'
import {fetchCurrProdReviews} from '../store'
import {Link} from 'react-router-dom'

class ProductReviews extends React.Component {
  componentDidMount () {
    console.log(this.props, 'THIS IS PROPS')
    this.props.getReviews(+this.props.match.params.id)
  }
  render () {
    let {reviews} = this.props
    return (
      <div>
        {
          reviews.map(review =>
            (
              <div key={review.id}>
                <p>{review.stars} Stars</p>
                <p>{review.body}</p>
                <p>User {review.userId}</p>
              </div>
            )
          )
        }
      </div>)
  }
}

const mapState = (state) => {
  // console.log('reviews state--->', state)
  return {
    reviews: state.reviews.currProdReviews
  }
}

const mapDispatch = (dispatch) => {
  return {
    getReviews: (id) => {
      dispatch(fetchCurrProdReviews(id))
    }
  }
}

export default connect(mapState, mapDispatch)(ProductReviews)
