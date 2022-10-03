const { Router } = require('express')
const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogs')

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

/**
 * http://localhost:3001/api/blogs/id
 */
router.patch('/:id', updateBlog)

module.exports = router
