const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()

router.get('/', (request, response) => {
  const statement = `select id, title, description from Category`
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.post('/', (request, response) => {
  const { title, description } = request.body
  const statement = `insert into Category (title, description) values (?, ?)`
  db.pool.execute(statement, [title, description], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
