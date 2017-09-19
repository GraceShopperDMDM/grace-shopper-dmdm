const router = require('express').Router()
const { User, Order, Review, Chocolate, ChocolateOrder, Cart } = require('../db/models')
// const { User, Order, Review, Chocolate } = require('../db/models')
const { isAdmin, isAuthenticated, selfOrAdmin, self } = require('../utils/gatekeepers')
module.exports = router

// only admins can get all users - WORKS
router.get('/', isAuthenticated, isAdmin, (req, res, next) => {
  User.findAll({
    attributes: {
      exclude: ['password', 'salt']
    }
  })
    .then(users => res.json(users))
    .catch(next)
})

// only authenticated users who match that id or admin users can get the user - WORKS
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

// only user or admin can see an individual's orders - WORKS
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

// router.get('/:id/cart', isAuthenticated, selfOrAdmin, (req, res, next) => {
//   User.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(user => {
//       Cart.findAll({
//         where: {
//           userId: user.id
//         }
//       }
//       )
//         .then(carts => res.json(carts))
//         .catch(console.error)
//     })
//     .catch(next)
// })

// anyone can look at reviews - WORKS
router.get('/:id/reviews', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.getReviews({include: [ Chocolate ]})
        .then(reviews => res.json(reviews))
        .catch(console.error)
    })
    .catch(next)
})

// anyone can create a user - WORKS via curl
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})

// only self or admin can delete an individual user - isAuthenticated Works via curl
router.delete('/:id', isAuthenticated, selfOrAdmin, (req, res, next) => {
  const id = req.params.id
  User.destroy({ where: {id} })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// only self or admin can get info about an individual user - isAuthenticated Works via curl
router.put('/:id', isAuthenticated, selfOrAdmin, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
})
// isAuthenticated, self,
router.post('/:id/orders', isAuthenticated, self, (req, res, next) => {
  console.log('body===>', req.body)
  User.findById(req.params.id)
    .then(user =>
      Order.create(req.body) // req.body.chocolates =[{chocolateId, quantity, purchasedPrice}]
        .then(order => {
          let orderId = order.id
          return user.addOrder(order)
            .then(() =>
              Promise.all(req.body.chocolates.map(chocolate => {
                chocolate.orderId = orderId
                return ChocolateOrder.create(chocolate)
              }))
            )
            .then(newOrder => res.json(newOrder))
        }))
    .then(() =>
      Promise.all(req.body.chocolates.map(chocolate => {
        let quantity = chocolate.quantity
        return Chocolate.findById(chocolate.chocolateId)
          .then(foundChocolate => {
            // console.log(foundChocolate, quantity)
            return foundChocolate.editStock(-quantity)
          }
          )
      }))
    )
    .catch(next)
})

router.get('/:id/cart', (req, res, next) => {
  Cart.findAll({where: {userId: req.params.id}})
    .then(cart => res.json(cart))
})

router.put('/:id/cart', (req, res, next) => {
  console.log('tehe', req.body)
  Cart.findOrCreate({where: {userId: req.params.id, chocolateId: req.body.chocolateId}, defaults: {quantity: req.body.quantity}})
    .then(cart => {
      console.log('here????')
      cart[0].update(req.body)
        .then(updatedCart => res.json(updatedCart))
    })
})

router.delete('/:id/cart/:chocolateId', (req, res, next) => {
  console.log('req body', req.params)
  Cart.destroy({where: {userId: req.params.id, chocolateId: req.params.chocolateId}})
    .then(() => res.sendStatus(204))
    .catch(next)
})

// only self or admin can get an individual user's order - WORKS
router.get('/:id/orders/:orderId', isAuthenticated, selfOrAdmin, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.getOrders({
        where: {
          id: req.params.orderId
        }
      })
    })
    .then(order => res.json(order))
    .catch(next)
})

// only self can write a review - isAuthenticated Works via curl
router.post('/:id/reviews', isAuthenticated, self, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Review.create(req.body)
        .then(review => user.addReview(review))
        .then(newReview => res.json(newReview))
    })
    .catch(next)
})

// only self or admin can edit a review - isAuthenticated Works via curl
router.put('/:id/reviews/:reviewId', isAuthenticated, selfOrAdmin, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.getReviews({
        where: {
          id: req.params.reviewId
        }
      })
    })
    .then(review => review.update(req.body))
    .then(updatedReview => res.json(updatedReview))
    .catch(next)

  // Review.findById(req.params.reviewId)
  //   .then(review => review.update(req.body))
  //   .then(updatedReview => res.json(updatedReview))
  //   .catch(next)
})

// only self or admin can delete an review - isAuthenticated Works via curl
router.delete('/:id/reviews/:reviewId', isAuthenticated, selfOrAdmin, (req, res, next) => {
  const reviewId = req.params.reviewId
  Review.destroy({ where: {id: reviewId} })
    .then(() => res.sendStatus(204))
    .catch(next)
})
