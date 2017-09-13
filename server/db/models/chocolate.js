const Sequelize = require('sequelize')
const db = require('../db')

const Chocolate = db.define('chocolate', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: { // make category a model
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER, // in cents OR Seq.DECIMAL
    allowNull: false
  },
  stock: { // default val, nonzero validation
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.google.com/search?q=kilwins+chocolate&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi9sITYw6LWAhWq5IMKHcOjB3UQ_AUIDCgD&biw=1776&bih=845#imgrc=yGY-WoNoYQEVVM:'
  }
})

// instance method for increasing/decrementing stock
// getter method convert price to dollars from cents

module.exports = Chocolate
