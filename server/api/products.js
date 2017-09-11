const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({
  })
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(product => res.json(product))
    .catch(next)
})

router.get('/type/:type', (req, res, next) => {
  Product.findAll({
    where: {
      type: req.params.type
    }
  })
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id/reviews', (req, res, next) => {
  Product.getReviews({
    where: {
      productId: req.params.id
    }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Product.destroy({ where: {id} })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Product.findbyId(req.params.id)
    .then(product => product.update(req.body))
    .catch(next)
})
