const router = require('express').Router()
const { User, Order, Review, Chocolate } = require('../db/models')
module.exports = router

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

router.get('/:id/orders', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      user.getOrders({
        include: [{model: Chocolate, as: 'chocolates'}]
      })
        .then(orders => res.json(orders))
        .catch(console.error)
    })
    .catch(next)
})

router.get('/:id/reviews', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      user.getReviews()
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
  User.findbyId(req.params.id)
    .then(user => user.update(req.body))
    .catch(next)
})

router.post('/:id/orders', (req, res, next) => {
  User.findbyId(req.params.id)
    .then(user => {
      Order.create(req.body)
        .then(order => user.setOrder(order))
    })
    .catch(next)
})

router.post('/:id/reviews', (req, res, next) => {
  User.findbyId(req.params.id)
    .then(user => {
      Review.create(req.body)
        .then(review => user.setOrder(review))
    })
    .catch(next)
})
