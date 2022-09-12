const { Router } = require('express');
const { getBlogs, addBlog } = require('../controllers/blogs');

const router = Router();

/**
 * http://localhost:3001/api/blogs
 */
router.get('/', getBlogs);

/**
 * http://localhost:3001/api/blogs
 */
router.post('/', addBlog);

module.exports = router;
