const Sequelize = require('sequelize')
const db = require('../db')

const Chocolate = db.define('chocolate', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT
  },
  stock: {
    type: Sequelize.INTEGER
  },
  photo: {
    type: Sequelize.STRING
  }
})

module.exports = Chocolate
