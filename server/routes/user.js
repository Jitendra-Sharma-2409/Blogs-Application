const express = require('express')
const db = require('../db')
const router = express.Router()
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const cryptoJs = require('crypto-js')

router.post('/signup', (request, response) => {
  const { firstName, lastName, email, phone, password } = request.body

  const encryptedPassword = String(cryptoJs.SHA256(password))

  const statement = `insert into User (firstName, lastName, email, phone, password) values (?, ?, ?, ?, ?)`
  db.pool.execute(
    statement,
    [firstName, lastName, email, phone, encryptedPassword],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.post('/signin', (request, response) => {
  const { email, password } = request.body

  const encryptedPassword = String(cryptoJs.SHA256(password))

  const statement = `SELECT id, firstName, lastName, phone FROM User WHERE email = ? and password = ?`
  db.pool.execute(statement, [email, encryptedPassword], (error, users) => {
    if (error) {
      response.send(utils.createError(error))
    } else {
      if (users.length == 0) {
        response.send(utils.createError('User does not exist'))
      } else {
        const { id, firstName, lastName, phone } = users[0]

        const payload = {
          id,
          firstName,
          lastName,
        }
        const token = jwt.sign(payload, config.secret)
        response.send(
          utils.createSuccess({
            token,
            phone,
            firstName,
            lastName,
          })
        )
      }
    }
  })
})

module.exports = router
