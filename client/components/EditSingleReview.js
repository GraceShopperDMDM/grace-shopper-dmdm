import React from 'react'
import {connect} from 'react-redux'
import {EditReview, removeReview} from '../store'

export const EditSingleReview = (props) => {
  let {user, ProdReviews} = props
  if (ProdReviews) {
    let ProdReview = ProdReviews.find(review => +review.id === +props.match.params.reviewId)
    if (ProdReview) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-4" >
              <form className="panel panel-primary" onSubmit={props.handleSubmit}>
                <div className="panel-heading">Edit Review</div>
                <div className="panel-body">
                  <label>Rate This Product</label>
                  <select name="ratings" defaultValue={`{currReview.stars}`}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <label>Edit Review</label><input type='text' name="review" className='form-control' defaultValue={ProdReview.body} />
                  <label>Author</label><input type='text' name="author" className='form-control' defaultValue={ProdReview.userId} disabled/>
                  <button type="submit">Submit</button>
                </div>
              </form>
              {
                user.isAdmin && (
                  <button value={ProdReview} className="btn btn-danger" onClick={props.deleteReview}>Delete</button>
                )
              }
            </div>
          </div>
        </div>
      )
    }
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

const mapState = (state) => {
  return {
    ProdReviews: state.reviews.currProdReviews,
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: function (event) {
      const id = +ownProps.match.params.id
      const stars = event.target.ratings.value
      const body = event.target.review.value
      const userId = +event.target.author.value
      event.preventDefault()
      dispatch(EditReview({stars, body, userId}, id, ownProps.history))
    },
    deleteReview: (e) => {
      const userId = +ownProps.match.params.id
      const reviewId = +ownProps.match.params.reviewId
      dispatch(removeReview(reviewId, userId, ownProps.history))
    }
  }
}

export default connect(mapState, mapDispatch)(EditSingleReview)
