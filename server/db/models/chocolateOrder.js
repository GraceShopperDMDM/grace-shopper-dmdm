const Sequelize = require('sequelize')
const db = require('../db')

const ChocolateOrder = db.define('chocolateOrder', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasedPrice: {
    type: Sequelize.FLOAT
  },
  totalPrice: {
    type: Sequelize.FLOAT
  }

})

ChocolateOrder.hook('afterValidate', (chocolateOrder) => {
  chocolateOrder.totalPrice = chocolateOrder.quantity * chocolateOrder.purchasedPrice
})

module.exports = ChocolateOrder
