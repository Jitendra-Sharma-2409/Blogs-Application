const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const utils = require('./utils')
const jwt = require('jsonwebtoken')
const config = require('./config')

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true, limit: '100mb' }))

app.use((request, response, next) => {
  if (request.url == '/user/signup' || request.url == '/user/signin') {
    next()
  } else {
    const token = request.headers['token']
    if (!token || token.length == 0) {
      response.send(utils.createError('Missing token'))
    } else {
      try {
        const payload = jwt.verify(token, config.secret)

        request.user = payload

        next()
      } catch (ex) {
        response.send(utils.createError('Invalid token'))
      }
    }
  }
})

const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const blogsRouter = require('./routes/blog')

app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/blog', blogsRouter)

app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})
