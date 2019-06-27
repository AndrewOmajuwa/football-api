//import router
const {Router} = require('express')

//import toJWT
const {toJWT} = require('./jws')

//import bcrypt
const bcrypt = require ('bcrypt')

//import auth

const auth = require('../auth/middleware')

//instantiate a router
const router = new Router()

//import User 
const User = require('../user/model')

//define endpoint to login

// define route of post type, the endpoint / logins
router.post('/logins', (req, res) => {
    // 1. find user based on email address
User
.findOne({
  where: {
    email: req.body.email
  }
})
.then(entity => {
  if (!entity) {
    res.status(400).send({
      message: 'User with that email does not exist'
    })
  }

  // 2. use bcrypt.compareSync to check the password against the stored hash
  if (bcrypt.compareSync(req.body.password, entity.password)) {

    // 3. if the password is correct, return a JWT with the userId of the user (user.id)
    res.send({
      jwt: toJWT({ userId: entity.id })
    })
  }
  else {
    res.status(400).send({
      message: 'Password was incorrect'
    })
  }
})
.catch(err => {
  console.error(err)
  res.status(500).send({
    message: 'Something went wrong'
  })
}) 
})

//define the secret-endpoint

router.get('/secret-endpoint', (req, res) => {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
      try {
        const data = toData(auth[1])
        res.send({
          message: 'Thanks for visiting the secret endpoint.',
          data
        })
      }
      catch(error) {
        res.status(400).send({
          message: `Error ${error.name}: ${error.message}`,
        })
      }
    }
    else {
      res.status(401).send({
        message: 'Please supply some valid credentials'
      })
    }
  })

  router.get('/secret-endpoint', auth, (req, res) => {
    res.send({
      message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    })
  })

module.exports  = router