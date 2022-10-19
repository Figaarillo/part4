const Blog = require('../model/blog')
const handleHTTPError = require('../utils/handleHTTPError')
const logger = require('../utils/logger')
const {
  validateMissingBlogProperties,
  validateLikesField,
} = require('../utils/validateProperties')

const getBlogs = async (_, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    return res.json(blogs).end()
  } catch (error) {
    handleHTTPError(res, 'error getting blog')
    logger.error(`❗❗❗ Error: ${error.message}`)
  }
}

const addBlog = async (req, res) => {
  try {
    const { token: user, ...blog } = req.body

    validateMissingBlogProperties(blog)

    const newBlog = new Blog({ ...blog, user: user._id })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201)

    return res.json(savedBlog).end()
  } catch (error) {
    handleHTTPError(res, 'error adding blog')
    logger.error(`❗❗❗ Error: ${error.message}`)
  }
}

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params

    const { token: user } = req.body

    const blog = await Blog.findById(id)

    if (!blog) return handleHTTPError(res, 'you cannot delete this blog', 403)

    if (!(blog.user._id.toString() === user._id.toString())) {
      return handleHTTPError(res, 'you cannot delete this blog', 403)
    }

    await Blog.findByIdAndDelete(id)

    res.status(204).end()
  } catch (error) {
    handleHTTPError(res, 'error deleting blog')
    logger.error(`❗❗❗ Error: ${error}`)
  }
}

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params

    const likes = validateLikesField(req.body.likes)

    const blogInDatabase = await Blog.findById(id)

    blogInDatabase.likes = likes

    blogInDatabase.save()

    return res.send(blogInDatabase).end()
  } catch (error) {
    handleHTTPError(res, 'error updating blog')
    logger.error(`❗❗❗ Error: ${error.message}`)
  }
}

module.exports = { getBlogs, addBlog, deleteBlog, updateBlog }
