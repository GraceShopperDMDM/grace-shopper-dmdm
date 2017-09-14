const router = require('express').Router()
const { User, Order, Review, Chocolate } = require('../db/models')
module.exports = router

// const isAuthenticated = (req, res, next) => {
//   if (!req.isAuthenticated()) { // or !req.user
//     const error = new Error('Please log in')
//     error.status = 401
//     return next(error)
//   } else {
//     next()
//   }
// }

// const isAdmin = (req, res, next) => {
//   if (req.user && !req.user.isAdmin) {
//     const error = new Error('Please log in')
//     error.status = 401
//     return next(error)
//   } else {
//     next()
//   }
// }

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: {
      exclude: ['password', 'salt']
    }
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
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
      Order.create(req.body) // req.body.chocolates =[{id, quantity, price}]
        .then(order => user.addOrder(order)) // double check - changed from user.setOrders()
        .then(newOrder => res.json(newOrder))
    })
    .then(() =>
      Promise.all(req.body.chocolates.map(chocolate => {
        let quantity = chocolate.quantity
        return Chocolate.findById(chocolate.id)
          .then(foundChocolate => {
            // console.log(foundChocolate, quantity)
            return foundChocolate.editStock(-quantity)
          }
          )
      }))
    )
    .catch(next)
})

router.post('/:id/reviews', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Review.create(req.body)
        .then(review => user.addReview(review)) // double check - changed from user.setReviews()
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
