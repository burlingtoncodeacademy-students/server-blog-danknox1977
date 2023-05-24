require('dotenv').config()



const express = require('express')
const app = express()

// const db = require('./db.js')

app.use(express.json())

//set global variables


const router = require('./controllers/routes.js')



app.use('/', router)

app.listen(process.env.PORT, () => {
  console.log('Hey, I\'m listening here!')
})





app.use('/', router)
