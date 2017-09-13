const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shipdate: {
    type: Sequelize.DATE
  },
  deliverydate: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('received', 'shipped', 'delivered') // needs defaultVal
  }
})

module.exports = Order
