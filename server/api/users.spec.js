/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { User, Chocolate, Order, Review } = require('../db/models')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    })
  })

  describe('/api/users/', () => {
    const username = 'Tom'
    const email = 'tom@tom.com'
    const address = '133 st., NY, 34900'
    const password = '1234'
    const admin = 'true'

    it('GET /api/users', () => {
      User.create({
        username,
        email,
        address,
        admin
      })
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].username).to.be.equal(username)
          expect(res.body[0].email).to.be.equal(email)
          expect(res.body[0].address).to.be.equal(address)
          expect(res.body[0].admin).to.be.equal(admin)
        })
    })

    it('POST /api/users/:id', () => {
      request(app).post('/api/users')
        .send({
          username: 'John',
          email: 'john@john.com',
          address: '123 Wall st',
          admin: 'true'
        })
        .then(res => console.log(res.body))
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.username).to.be.equal(username)
          expect(res.body.email).to.be.equal(email)
          expect(res.body.address).to.be.equal(address)
          expect(res.body.admin).to.be.equal(admin)
        })
    })

    xit('PUT /api/users', () => {
      return request(app)
        .put('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    xit('DELETE /api/users', () => {
      return request(app)
        .delete('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Chocolate.create({
        email: codysEmail
      })
    })

    xit('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    xit('POST /api/products', () => {
      return request(app)
        .post('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    xit('PUT /api/products', () => {
      return request(app)
        .put('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    xit('DELETE /api/products', () => {
      return request(app)
        .delete('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/products')
}) // end describe('User routes')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Order.create({
        email: codysEmail
      })
    })

    xit('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    xit('POST /api/orders', () => {
      return request(app)
        .post('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    xit('PUT /api/orders', () => {
      return request(app)
        .put('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    xit('DELETE /api/orders', () => {
      return request(app)
        .delete('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/orders')
}) // end describe('User routes')
