const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./utils/config')
const routeBlogs = require('./routes/blogs')
const routeUsers = require('./routes/users')
const dbConnectMongo = require('./database/mongo')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// Routes
app.use('/api/blogs', routeBlogs)

app.use('/api/users', routeUsers)

// Database connection
dbConnectMongo(config.MONGODB_URI)

module.exports = app
