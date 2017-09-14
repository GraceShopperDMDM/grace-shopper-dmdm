const router = require('express').Router()
const { User, Order, Review, Chocolate } = require('../db/models')
const { isAdmin, isAuthenticated, selfOrAdmin, self } = require('../utils/gatekeepers')
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
router.get('/:id', isAuthenticated, selfOrAdmin, (req, res, next) => {
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

// only user or admin can see an individual's orders
router.get('/:id/orders', isAuthenticated, selfOrAdmin, (req, res, next) => {
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

// anyone can look at reviews
router.get('/:id/reviews', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.getReviews({include: [ Chocolate ]})
        .then(reviews => res.json(reviews))
        .catch(console.error)
    })
    .catch(next)
})

// anyone can create a user
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})

// only self or admin can delete an individual user
router.delete('/:id', isAuthenticated, selfOrAdmin, (req, res, next) => {
  const id = req.params.id
  User.destroy({ where: {id} })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// only self or admin can get info about an indivudual user
router.put('/:id', isAuthenticated, selfOrAdmin, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
})

// only self can create an order
router.post('/:id/orders', isAuthenticated, self, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Order.create(req.body)
        .then(order => user.addOrder(order))
        .then(newOrder => res.json(newOrder))
    })
    .catch(next)
})

// only self or admin can get an individual user's order
router.get('/:id/orders/:orderId', isAuthenticated, selfOrAdmin, (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [{model: Chocolate, as: 'chocolates'}]
  })
    .then(order => res.json(order))
    .catch(next)
})

// only self can write a review
router.post('/:id/reviews', isAuthenticated, self, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Review.create(req.body)
        .then(review => user.addReview(review))
        .then(newReview => res.json(newReview))
    })
    .catch(next)
})

// only self or admin can edit a review
router.put('/:id/reviews/:reviewId', isAuthenticated, selfOrAdmin, (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(review => review.update(req.body))
    .then(updatedReview => res.json(updatedReview))
    .catch(next)
})

// only self or admin can delete an review
router.delete('/:id/reviews/:reviewId', isAuthenticated, selfOrAdmin, (req, res, next) => {
  const reviewId = req.params.reviewId
  Review.destroy({ where: {id: reviewId} })
    .then(() => res.sendStatus(204))
    .catch(next)
})
