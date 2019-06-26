//import express
const express = require('express')
//import db.js
const db = require('./db.js')
//import Team from model.js
const team = require('./team/model.js')
//import bodyparser
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json() 
//import router from router.js
const teamRouter = require('./team/router')
//create an app  api server
const app = express()
//create a port to listen on
const port = process.env.PORT || 4000
//pass the app.listen to start server and specify port to listen on
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}
)

app.use(jsonParser)
app.use(teamRouter)
