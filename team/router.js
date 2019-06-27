//import router from express
const { Router } = require('express')
//import team model
const Team = require('./model')
//instantiate router
const router = new Router()
//register get endpoint to get all teams
router.get('/team', (req, res, next) => {
    Team.findAll()
    .then(teams => {
        res.send(teams)
    })
    .catch(error => next(error))
})

//add post endpoint to add a team
router.post('/team', (req, res, next) => {
    Team.create(req.body)
    .then(team => res.status(200)
    .send(team))
    .catch(err => next(err)) 
    })

//make endpoint to retrieve a specific team based on ID

router.get('/team/:id', (req, res, next) => {
    const id = req.params.id
    Team.findByPk(id)
    .then(team => {
        res.status(200).send(team)
    })
    .catch(err => next(err))
})

//make endpoint to update team values/properties
router.put('/team/:id', (req, res, next) => {
    const id = req.params.id
    Team.findByPk(id)
    .then(team => team.update(req.body))
    .then(team => res.status(200).send(team))
    .catch(err => next(err))
})

//parralel promises returning count() and findAll()
router.get('/teams', (req, res, next) => {
    const limit = req.query.limit || 5
    const offset = req.query.offset || 0
  
    Promise.all([
      Team.count(),
      Team.findAll({ limit, offset })
    ])
      .then(([total, teams]) => {
        res.send({
          teams, total
        })
      })
      .catch(error => next(error))
  })

module.exports = router