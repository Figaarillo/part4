const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
const app = require('./app');

const dbConnectMongo = require('./database/mongo');

const server = http.createServer(app);

// Server
server.listen(config.PORT, () => {
	logger.info(`Server run! 🤟🔥 Go to http://localhost:${config.PORT}`);
});

// Database connection
dbConnectMongo(config.MONGODB_URI);
