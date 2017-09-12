const Sequelize = require('sequelize')
const db = require('../db')

const Chocolate = db.define('chocolate', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  stock: {
    type: Sequelize.INTEGER
  },
  photo: {
    type: Sequelize.STRING
  }
})

module.exports = Chocolate