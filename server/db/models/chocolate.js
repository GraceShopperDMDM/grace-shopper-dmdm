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
    type: Sequelize.DECIMAL, // in cents OR Seq.DECIMAL
    allowNull: false
  },
  stock: { // default val, nonzero validation
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.kilwins.com/sites/default/files/imagecache/page-accent/product_image/category/Kilwin%27s%20Combo%20-%20Copy.jpg'
  }
})

Chocolate.prototype.editStock = function (size) {
  this.stock += size
  return this.save()
}

// instance method for increasing/decrementing stock
// getter method convert price to dollars from cents

module.exports = Chocolate
