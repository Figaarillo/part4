const Blog = require('../model/blog')
const checkProperties = require('../utils/checkProperties')
const handleHTTPError = require('../utils/handleHTTPError')
const logger = require('../utils/logger')

const getBlogs = async (_, res) => {
  const blogs = await Blog.find({})

  return res.json(blogs).end()
}

/**
 *  Add new blog and save it to the database.
 * @param {*} req.body = { title, author, url, likes}
 * @param {*} res saved blogs
 */
const addBlog = async (req, res) => {
  try {
    const blog = req.body

    checkProperties(blog)

    const newBlog = new Blog(blog)

    const result = await newBlog.save()

    res.status(201)

    return res.json(result).end()
  } catch (error) {
    handleHTTPError(res, 'Error adding blog')
    logger.error(`❗❗❗ Error: ${error.message}`)
  }
}

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params

    await Blog.findByIdAndDelete(id)

    res.status(204).end()
  } catch (error) {
    handleHTTPError(res, 'Error deleting blog')
    logger.error(`❗❗❗ Error: ${error.message}`)
  }
}

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params

    let { likes } = req.body

    likes = Number(likes)

    if (!likes) throw new Error('field cannot be updated, invalid likes field')

    likes = Math.round(likes)

    if (likes < 0)
      throw new Error('field cannot be updated, invalid likes field')

    const blogInDatabase = await Blog.findById(id)

    blogInDatabase.likes = likes

    blogInDatabase.save()

    return res.send(blogInDatabase).end()
  } catch (error) {
    handleHTTPError(res, 'Error updating blog')
    logger.error(error.message)
  }
}

module.exports = { getBlogs, addBlog, deleteBlog, updateBlog }
