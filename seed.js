const db = require('./server/db')
const { User, Order, Chocolate, Review, ChocolateOrder } = require('./server/db/models')

const users = [
  {
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
  }, {
    username: 'Larry',
    email: 'larry@larry.com',
    address: '124 some ave., NY, 11500',
    password: '123',
    isAdmin: 'true'
  }, {
    username: 'Terry',
    email: 'terry@terry.com',
    address: '125 some ave., NY, 12500',
    password: '123',
    isAdmin: 'false'
  }
]

const chocolates = [{
  name: 'Rocky Road',
  category: 'ice cream',
  description: 'Very delicious!',
  photo: 'https://cdn.pixabay.com/photo/2014/01/16/00/51/ice-cream-246161__340.jpg',
  price: 10.25,
  stock: 15
}, {
  name: 'Dark Chocolate Fudge',
  category: 'fudge',
  description: 'Very good!',
  photo: 'https://cdn.pixabay.com/photo/2015/12/07/17/49/fudge-1081100__340.jpg',
  price: 12.50,
  stock: 18
}, {
  name: 'Chocolate Shavings',
  category: 'dark',
  description: 'Literally just shavings of chocolate.',
  photo: 'https://cdn.pixabay.com/photo/2017/04/12/16/56/chocolate-2224998__340.jpg',
  price: 9.95,
  stock: 2000
}, {
  name: 'White Chocolate',
  category: 'white',
  description: 'Still Counts!',
  photo: 'https://cdn.pixabay.com/photo/2014/06/30/20/05/white-chocolate-380702__340.jpg',
  price: 14.40,
  stock: 101
}, {
  name: 'Nutty Dark',
  category: 'dark',
  description: 'So Dark, much Nutty!',
  photo: 'https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543__340.jpg',
  price: 3.98,
  stock: 4
}, {
  name: 'Hand-Churned Chocolate Ice Cream',
  category: 'ice cream',
  description: 'Churned up a hill in the snow, both ways!',
  photo: 'https://cdn.pixabay.com/photo/2014/02/08/11/28/bun-261677__340.jpg',
  price: 11.89,
  stock: 29
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
  body: 'This is great! Also the earth is flat',
  chocolateId: 1,
  userId: 1
}, {
  stars: '1',
  body: 'This is terrible! Whoever made this should be sad.',
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
