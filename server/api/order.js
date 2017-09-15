const router = require('express').Router()
const { Order, Chocolate } = require('../db/models')
const { isAdmin, isAuthenticated } = require('../utils/gatekeepers')
module.exports = router

// only admin can get all orders - WORKS
router.get('/', isAuthenticated, isAdmin, (req, res, next) => {
  Order.findAll({
    include: [{model: Chocolate, as: 'chocolates'}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

// only admin can edit an individual user's order (user must contact admin) - isAuthenticated works via curl
router.put('/:id', isAuthenticated, isAdmin, (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next)
})

// only admin can delete an individual user's order (user must contact admin) - isAuthenticated works via curl
router.delete('/:id', isAuthenticated, isAdmin, (req, res, next) => {
  const id = req.params.id
  Order.destroy({ where: {id} })
    .then(() => res.sendStatus(204))
    .catch(next)
})
