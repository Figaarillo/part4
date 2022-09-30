const Blog = require('../model/blog')
const checkProperties = require('../utils/checkProperties')

const getBlogs = async (_, res) => {
  const blogs = await Blog.find({})
  return res.json(blogs)
}

/**
 *  Add new blog and save it to the database.
 * @param {*} req.body = { title, author, url, likes}
 * @param {*} res saved blogs
 */
const addBlog = (req, res) => {
  const blog = req.body

  checkProperties(blog)

  const newBlog = new Blog(blog)

  newBlog.save().then((result) => {
    res.status(201)
    return res.json(result)
  })
}

module.exports = { getBlogs, addBlog }
