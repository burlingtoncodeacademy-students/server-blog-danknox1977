require('dotenv').config()



const express = require('express')
const app = express()

// const db = require('./db.js')

app.use(express.json())

//set global variables
const PORT = 3636

const router = require('./controllers/routes.js')



app.use('/', router)

app.listen(PORT, () => {
  console.log('Hey, I\'m listening here!')
})





app.use('/', router)
