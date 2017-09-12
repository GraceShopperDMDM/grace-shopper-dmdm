const User = require('./user')
const Chocolate = require('./chocolate')
const Review = require('./review')
const Order = require('./order')
const ChocolateOrder = require('./chocolateOrder')

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

Review.belongsTo(User)
User.hasMany(Review)

// Chocolate.hasMany(Order)
// Order.hasMany(Chocolate)
Order.belongsToMany(Chocolate, {through: ChocolateOrder})
Chocolate.belongsToMany(Order, {through: ChocolateOrder})

module.exports = {
  User,
  Chocolate,
  Review,
  Order
}
