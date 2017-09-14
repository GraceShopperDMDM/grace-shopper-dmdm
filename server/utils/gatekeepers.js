const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) { // or !req.user
    const error = new Error('Please log in or sign up')
    error.status = 401
    return next(error)
  } else {
    next()
  }
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    const error = new Error('You are not an administrator')
    error.status = 401
    return next(error)
  } else {
    next()
  }
}

function selfOrAdmin (req, res, next) {
  if (!req.user) {
    res.status(401).end()
  } else if (!req.user.isAdmin && +req.user.id !== +req.params.id) {
    res.status(403).end()
  } else {
    next()
  }
}

function self (req, res, next) {
  if (+req.user.id !== +req.params.id) {
    res.status(403).end()
  } else {
    next()
  }
}

module.exports = {
  isAuthenticated,
  isAdmin,
  selfOrAdmin,
  self
}
