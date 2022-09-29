const mongoose = require('mongoose')
const logger = require('../utils/logger')

const dbConnectMongo = (URI) => {
  mongoose
    .connect(URI, { usenewurlparser: true, useunifiedtopology: true })
    .then(() => logger.info('Database conection established 😼'))
    .catch((error) => logger.error(`❌ Can not connect to database: ${error}`))
}

module.exports = dbConnectMongo
