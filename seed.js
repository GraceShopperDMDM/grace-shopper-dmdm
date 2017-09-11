const db = require('./server/db')
const { User } = require('./server/db/models')

db.sync({force: true})
  .then(() => {
    return User.create({name: 'Cody'})
  })
  .then(() => {
    db.close()
    process.exit(0)
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
