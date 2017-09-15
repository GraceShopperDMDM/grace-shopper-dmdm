const db = require('./server/db')
const { User, Order, Chocolate, Review, ChocolateOrder } = require('./server/db/models')

const users = [{
  username: 'Cody',
  email: 'cody@cody.com',
  address: '111 some st., NY, 11000',
  password: '123',
  isAdmin: 'false'
}, {
  username: 'Garry',
  email: 'garry@garry.com',
  address: '122 some ave., NY, 11300',
  password: '123',
  isAdmin: 'true'
}]

const chocolates = [{
  name: 'rocky road',
  category: 'ice cream',
  description: 'very delicious!',
  price: 10.25,
  stock: 15
}, {
  name: 'dark chocolate fudge',
  category: 'fudge',
  description: 'very good!',
  price: 12.50,
  stock: 20
}]

const orders = [{
  shipdate: Date(),
  deliverydate: Date(),
  status: 'received',
  userId: 1
}, {
  shipdate: Date(),
  deliverydate: Date(),
  status: 'shipped',
  userId: 2
}]

const reviews = [{
  stars: '5',
  body: 'this is great!',
  chocolateId: 1,
  userId: 1
}, {
  stars: '1',
  body: 'this is terrible!',
  chocolateId: 2,
  userId: 2
}]

const chocolateOrders = [{
  quantity: 5,
  purchasedPrice: 12.5,
  orderId: 1,
  chocolateId: 1

}, {
  quantity: 4,
  purchasedPrice: 8.25,
  orderId: 2,
  chocolateId: 2
}]

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user))
  ).then(() =>
    Promise.all(chocolates.map(chocolate =>
      Chocolate.create(chocolate))
    )).then(() =>
    Promise.all(orders.map(order =>
      Order.create(order))
    )).then(() =>
    Promise.all(reviews.map(review =>
      Review.create(review))
    )).then(() =>
    Promise.all(chocolateOrders.map(chocolateOrder =>
      ChocolateOrder.create(chocolateOrder))
    ))

db.sync({force: true})
  .then(() => {
    // return User.create({username: 'Cody', email: 'cody@cody.com', address: ''})
    // console.log(seed)
    return seed()
  })
  .then(() => {
    db.close()
    process.exit(0)
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
