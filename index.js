//import express
const express = require('express')
//create an app  api server
const app = express()
//create a port to listen on
const port = process.env.PORT || 4000

//pass the app.listen to start server and specify port to listen on
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}
)
