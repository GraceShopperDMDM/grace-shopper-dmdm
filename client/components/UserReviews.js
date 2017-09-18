import React from 'react'
import {connect} from 'react-redux'
import {fetchCurrUserReviews} from '../store'
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
                <p>{review.stars}</p>
                <p>{review.body}</p>
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
      console.log(id)
      // console.log(props.match.params.id)
      dispatch(fetchCurrUserReviews(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserReviews)
