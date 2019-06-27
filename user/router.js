//import router
const {Router} = require('express')

//import bcrypt
const bcrypt = require ('bcrypt')

//import user model
const User = require('./model')

//instantiate a router
const router = new Router()

// define the user endpoint 

router.post('/user', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    User.create(user)
    .then(user => res.status(200).send(user))
    .catch(error => next(error))
})

module.exports = router 