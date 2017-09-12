const Sequelize = require('sequelize')
const db = require('../db')

const ChocolateOrder = db.define('chocolateOrder', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasedPrice: {
    type: Sequelize.FLOAT
  }
})

module.exports = ChocolateOrder
