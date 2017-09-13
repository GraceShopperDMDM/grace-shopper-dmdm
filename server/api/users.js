const router = require('express').Router()
const { User, Order, Review, Chocolate } = require('../db/models')
const { isAdmin, isAuthenticated, selfOrAdmin } = require('../utils/gatekeepers')
module.exports = router

// only admins can get all users
router.get('/', isAuthenticated, isAdmin, (req, res, next) => {
  User.findAll({
    attributes: {
      exclude: ['password', 'salt']
    }
  })
    .then(users => res.json(users))
    .catch(next)
})

// only authenticated users who match that id or admin users can get the user
router.get('/:id', selfOrAdmin, (req, res, next) => {
  User.findOne({
    attributes: {
      exclude: ['password', 'salt']
    },
    where: {
      id: req.params.id
    }
  })
    .then(user => res.json(user))
    .catch(next)
})

// OATH make sure that these orders are only for the user who requested it
router.get('/:id/orders', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      user.getOrders({
        include: [ Chocolate ]
      })
        .then(orders => res.json(orders))
        .catch(console.error)
    })
    .catch(next)
})

router.get('/:id/reviews', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.getReviews({include: [ Chocolate ]})
        .then(reviews => res.json(reviews))
        .catch(console.error)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  User.destroy({ where: {id} })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
})

router.post('/:id/orders', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Order.create(req.body)
        .then(order => user.addOrder(order))
        .then(newOrder => res.json(newOrder))
    })
    .catch(next)
})

router.post('/:id/reviews', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Review.create(req.body)
        .then(review => user.addReview(review))
        .then(newReview => res.json(newReview))
    })
    .catch(next)
})

// check OAuth to see if user can actually edit review
router.put('/:id/reviews/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(review => review.update(req.body))
    .then(updatedReview => res.json(updatedReview))
    .catch(next)
})

router.delete('/:id/reviews/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId
  Review.destroy({ where: {id: reviewId} })
    .then(() => res.sendStatus(204))
    .catch(next)
})
