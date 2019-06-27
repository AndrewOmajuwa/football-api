//import router from express
const { Router } = require('express')
//import player model
const Player = require('./model')
//import team
const Team = require('../team/model')
//instantiate router
const router = new Router()

//create an endpoint to find all players
router.get('/player', (req, res, next) => {
    Player.findAll()
    .then(players => res.status(200).send(players))
    .catch(error => next(error))
})

//create endpoint to create a player
router.post('/player', (req, res, next) => {
    Player.create(req.body)
    .then(player => res.status(200).send(player))
    .catch(error => next(error))
})

//create endpoint to select one player
router.get('/player/:id', (req, res, next) => {
    id = req.params.id
    Player.findByPk(id, {include: [Team]})
    .then(player => res.status(200).send(player))
    .catch(error => next(error))
})

//make endpoint to update player values/properties
router.put('/player/:id', (req, res, next) => {
    const id = req.params.id
    Player.findByPk(id)
    .then(player => player.update(req.body))
    .then(player => res.status(200).send(player))
    .catch(err => next(err))
})

//parralel promises returning count() and findAll()
router.get('/players', (req, res, next) => {
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0
  
    Promise.all([
      Player.count(),
      Player.findAll({ limit, offset })
    ])
      .then(([total, players]) => {
        res.send({
          players, total
        })
      })
      .catch(error => next(error))
  })


module.exports = router