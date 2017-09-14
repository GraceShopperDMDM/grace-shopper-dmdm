const router = require('express').Router()
const { Chocolate } = require('../db/models')
const { isAdmin, isAuthenticated } = require('../utils/gatekeepers')
module.exports = router

// anyone can get info about products - WORKS
router.get('/', (req, res, next) => {
  Chocolate.findAll({
  })
    .then(products => res.json(products))
    .catch(next)
})

// anyone can get info about individual product - WORKS
router.get('/:id', (req, res, next) => {
  Chocolate.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(product => res.json(product))
    .catch(next)
})

// anyone can get filter products by category - WORKS
router.get('/type/:type', (req, res, next) => { // use the category model -- /category/:categoryId
  Chocolate.findAll({
    where: {
      category: req.params.type
    }
  })
    .then(products => res.json(products))
    .catch(next)
})

// anyone can get reviews of an individual product - WORKS
router.get('/:id/reviews', (req, res, next) => {
  Chocolate.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(chocolate => {
      chocolate.getReviews()
        .then(reviews => res.json(reviews))
        .catch(console.error)
    })
    .catch(next)
})

// only admin can create a product - isAuthenticated works via curl
router.post('/', isAuthenticated, isAdmin, (req, res, next) => {
  Chocolate.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})

// only admin can delete a product - isAuthenticated works via curl
router.delete('/:id', isAuthenticated, isAdmin, (req, res, next) => {
  const id = req.params.id
  Chocolate.destroy({ where: {id} })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// only admin can edit a product - isAuthenticated works via curl
router.put('/:id', isAuthenticated, isAdmin, (req, res, next) => {
  Chocolate.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next)
})
