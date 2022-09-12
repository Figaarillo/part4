const express = require('express');
const cors = require('cors');
const routeBlogs = require('./routes/blogs');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', routeBlogs);

module.exports = app;
