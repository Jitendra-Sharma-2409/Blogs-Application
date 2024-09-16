const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
const multer = require('multer')

const upload = multer({ dest: 'documents' })

router.post('/', upload.single('image'), (request, response) => {
  const { title, contents, categoryId } = request.body
  const statement = `insert into Blog (title, contents, userId, categoryId, image) values (?, ?, ?, ?, ?)`
  db.pool.execute(
    statement,
    [title, contents, request.user.id, categoryId, request.file.filename],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.patch('/public-status/:id/:status', (request, response) => {
  const { id, status } = request.params
  const statement = `update Blog set isPublic = ? where id = ?`
  db.pool.execute(statement, [id, status], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get('/me', (request, response) => {
  const statement = `
    select 
      Blog.id, Category.title as CategoryTitle, 
      Blog.title as BlogTitle, image, 
      User.firstName, User.lastName 
    from Blog 
      inner join User 
        on User.id = Blog.userId 
      inner join Category 
        on Category.id = Blog.categoryId
    where userId = ?`
  db.pool.execute(statement, [request.user.id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get('/', (request, response) => {
  const statement = `
    select 
      Blog.id, Category.title as CategoryTitle, 
      Blog.title as BlogTitle, image, 
      User.firstName, User.lastName 
    from Blog 
      inner join User 
        on User.id = Blog.userId 
      inner join Category 
        on Category.id = Blog.categoryId
    where isPublic = 1`
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get('/details/:id', (request, response) => {
  const { id } = request.params
  const statement = `
    select 
      Blog.id, Category.title as CategoryTitle, 
      Blog.title as BlogTitle, image, contents,
      User.firstName, User.lastName
    from Blog 
      inner join User 
        on User.id = Blog.userId 
      inner join Category 
        on Category.id = Blog.categoryId
    where Blog.id = ?`
  db.pool.execute(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get('/comment/:id', (request, response) => {
  const { id } = request.params
  const statement = `
    select 
      BlogComment.id, comments, BlogComment.createdTimestamp,
      User.firstName, User.lastName
    from BlogComment 
      inner join User 
        on User.id = BlogComment.userId 
    where blogId = ?`
  db.pool.execute(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.post('/comment/:id', (request, response) => {
  const { id } = request.params
  const { comment } = request.body

  const statement = `insert into BlogComment (blogId, userId, comments) values (?, ?, ?)`
  db.pool.execute(
    statement,
    [id, request.user.id, comment],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

module.exports = router
