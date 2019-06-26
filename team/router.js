//import router from express
const { Router } = require('express')
//import team model
const Team = require('./model')
//instantiate router
const router = new Router()
//register get endpoint for team
router.get('/team', (req, res, next) => {
    Team.findAll()
    .then(teams => {
        res.send(teams)
    })
    .catch(error => next(error))
})

//add post endpoint for teams
router.post('/team', (req, res) => {
    console.log("NOTE HERE REQ BODY", req.body)
    Team.create(req.body)
    .then(team => res.status(200)
    .send(team))
    .catch(err => next(err)) 
    })


module.exports = router