const { Router } = require('express')
const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogs')
const tokenExtractor = require('../middlewares/tokenExtractor')

const router = Router()

router.get('/', tokenExtractor, getBlogs)

router.post('/', tokenExtractor, addBlog)

router.delete('/:id', tokenExtractor, deleteBlog)

router.patch('/:id', tokenExtractor, updateBlog)

module.exports = router
