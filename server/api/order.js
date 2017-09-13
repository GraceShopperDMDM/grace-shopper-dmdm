const router = require('express').Router()
const { Order, Chocolate } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{model: Chocolate, as: 'chocolates'}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, {
    include: [{model: Chocolate, as: 'chocolates'}]
  })
    .then(order => res.json(order))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Order.destroy({ where: {id} })
    .then(() => res.sendStatus(204))
    .catch(next)
})
