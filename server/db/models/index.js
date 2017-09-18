const User = require('./user')
const Chocolate = require('./chocolate')
const Review = require('./review')
const Order = require('./order')
const Category = require('./category')
const ChocolateOrder = require('./chocolateOrder')
const Cart = require('./cart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Order)
Order.belongsTo(User)

Review.belongsTo(Chocolate)
Chocolate.hasMany(Review)

// Chocolate.belongsTo(Category)
// Category.hasMany(Chocolate)

Review.belongsTo(User) // essentially a join table
User.hasMany(Review)

Order.belongsToMany(Chocolate, {through: ChocolateOrder}) // literally a model
Chocolate.belongsToMany(Order, {through: ChocolateOrder})

User.belongsToMany(Chocolate, {through: Cart})
Chocolate.belongsToMany(User, {through: Cart})

module.exports = {
  User,
  Chocolate,
  Review,
  Order,
  ChocolateOrder,
  Category,
  Cart
}
