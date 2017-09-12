const db = require('./server/db')
const { User, Order, Chocolate, Review } = require('./server/db/models')

const users = [{
  username: 'Cody',
  email: 'cody@cody.com',
  address: '111 some st., NY, 11000',
  admin: 'false'
}, {
  username: 'Garry',
  email: 'garry@garry.com',
  address: '122 some ave., NY, 11300',
  admin: 'true'
}]

const chocolates = [{
  name: 'rocky road',
  category: 'ice cream',
  description: 'very delicious!',
  price: 10,
  stock: 15,
  photo: 'daskdsad'
}, {
  name: 'dark chocolate fudge',
  category: 'fudge',
  description: 'very good!',
  price: 12,
  stock: 20,
  photo: 'kkkldsadklasj'
}]

const orders = [{
  shipdate: Date(),
  deliverydate: Date(),
  status: 'received'
}, {
  shipdate: Date(),
  deliverydate: Date(),
  status: 'shipped'
}]

const reviews = [{
  stars: '5',
  body: 'this is great!'
}, {
  stars: '1',
  body: 'this is terrible!'
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
    ))

db.sync({force: true})
  .then(() => {
    // return User.create({username: 'Cody', email: 'cody@cody.com', address: ''})
    console.log(seed)
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
