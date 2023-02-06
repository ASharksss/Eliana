require('dotenv').config()

const express = require('express')
const sequelize = require('./db.js')

const PORT = process.env.PORT || 5000

const app = express()


const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync().then(result => {
      console.log(result);
    })
      .catch(err => console.log(err))
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()