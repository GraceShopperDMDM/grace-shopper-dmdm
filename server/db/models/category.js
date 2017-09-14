const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// instance method for increasing/decrementing stock
// getter method convert price to dollars from cents


module.exports = Category
