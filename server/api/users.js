const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name', 'email', 'address']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => res.json(user))
    .catch(next)
})

router.get('/:id/orders', (req, res, next) => {
  User.getOrders({
    where: {
      userId: req.params.id
    }
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id/reviews', (req, res, next) => {
  User.getReviews({
    where: {
      userId: req.params.id
    }
  })
    .then(reviews => res.json(reviews))
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

// router.post('/:id/orders', (req, res, next) => {
//   Order.create(req.body)
//     .then(order => {
//       order.setUser()
//     })
//     .catch(next)
// })
