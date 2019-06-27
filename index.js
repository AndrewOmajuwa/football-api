//import express
const express = require('express')

//import auth-router
const authRouter = require('./auth/router')

//import user router
const userRouter = require('./user/router')

//import bodyparser
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json() 

//import router from router.js
const teamRouter = require('./team/router')

//import player router
const playerRouter = require('./player/router')

//create an app  api server
const app = express()

//create a port to listen on
const port = process.env.PORT || 4000
//pass the app.listen to start server and specify port to listen on
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}
)

//use methods
app.use(jsonParser)
app.use(teamRouter)
app.use(playerRouter)
app.use(authRouter)
app.use(userRouter)
