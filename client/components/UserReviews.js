import React from 'react'
import {connect} from 'react-redux'
import {fetchCurrUserReviews, fetchCurrProdReviews} from '../store'
import {Link} from 'react-router-dom'

class UserReviews extends React.Component {
  componentDidMount () {
    // console.log('props', this.props)
    // console.log('---->', this.props.user.id)
    // console.log(this.props.user)
    if (this.props.match.params.id) {
      this.props.getReviews(this.props.match.params.id)
    } else if (Object.keys(this.props.user).length) {
      this.props.getReviews(this.props.user.id)
    }
  }
  render () {
    let {reviews} = this.props
    return (
      <div>
        {
          reviews.map(review =>
            (
              <div key={review.id}>
                <Link to={`/products/${review.chocolate.id}`}><img src={review.chocolate.photo} /></Link>
                <Link to={`/users/${review.userId}/reviews/${review.id}`}>
                  <p>{review.stars}</p>
                  <p>{review.body}</p>
                </Link>
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
    reviews: state.reviews.currUserReviews,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getReviews: (id) => {
      dispatch(fetchCurrUserReviews(id))
      dispatch(fetchCurrProdReviews(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserReviews)
