const { Router } = require('express')
const { getBlogs, addBlog, deleteBlog } = require('../controllers/blogs')

const router = Router()

/**
 * http://localhost:3001/api/blogs
 */
router.get('/', getBlogs)

/**
 * http://localhost:3001/api/blogs
 */
router.post('/', addBlog)

/**
 * http://localhost:3001/api/blogs/id
 */
router.delete('/:id', deleteBlog)

module.exports = router
