const Sequelize = require('sequelize')
const db = require('../db')

const ChocolateOrder = db.define('chocolateOrder', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasedPrice: {
    type: Sequelize.INTEGER
  },
  totalPrice: {
    type: Sequelize.INTEGER
  }

})

ChocolateOrder.hook('afterValidate', (chocolateOrder) => { // replace with getterMethod
  chocolateOrder.totalPrice = chocolateOrder.quantity * chocolateOrder.purchasedPrice
})

module.exports = ChocolateOrder
