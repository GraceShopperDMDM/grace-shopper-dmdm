const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findOne({
  })
    .then(order => res.json(order))
    .catch(next)
})

