const Blog = require('../model/blog')
const User = require('../model/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const initialUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    passwordHash:
      '$2b$10$Tj1h.bbs8COrQBixX7ifb.tdTldLTCH6.VZsaaWaZInnoUj4Y1bh.',
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash:
      '$2b$10$KSwzlphLSRfIwish7laM0Obf.GauMQ6LHBT60k5toLf5rO3QeD53.',
  },
]

/**
 * @returns list of blogs in the database
 */
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

/**
 * @returns list of users in the database
 */
const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

/**
 * @param {*} api supertest api
 * @param {*} username
 * @param {*} password
 * @returns token of a registering user
 */
const getToken = async (api, username, password) => {
  const response = await api
    .post('/api/users/login')
    .send({ username, password })

  const {
    data: { token },
  } = response.body

  return token
}

module.exports = { initialBlogs, blogsInDb, initialUsers, usersInDb, getToken }
