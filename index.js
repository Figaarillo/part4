const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

// Server
server.listen(config.PORT, () => {
  logger.info(`Server run! 🤟🔥 Go to http://localhost:${config.PORT}`)
})

module.exports = { server }
