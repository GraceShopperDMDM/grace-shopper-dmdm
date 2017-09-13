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
    type: Sequelize.FLOAT,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.google.com/search?q=kilwins+chocolate&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi9sITYw6LWAhWq5IMKHcOjB3UQ_AUIDCgD&biw=1776&bih=845#imgrc=yGY-WoNoYQEVVM:'
  }
})

module.exports = Chocolate
