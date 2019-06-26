//import router from express
const { Router } = require('express')
//import team model
const team = require('./model')
//instantiate router
const router = new Router()
//register get endpoint for team
router.get('/team', (req, res, next) => {
    team.findAll()
    .then(teams => {
        res.send(teams)
    })
    .catch(error => next(error))
})

module.exports = router