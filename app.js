require('dotenv').config()



const express = require('express')
const app = express()

app.use(express.json())

const toDoData = require('./api/db.js')

const router = require('./controllers/routes.js')

const PORT = 36363

app.use('/', router)

app.listen(PORT, () => {
  console.log('Hey, I\'m listening here!')
})





app.use('/', router)
