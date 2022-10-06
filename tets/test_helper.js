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
    password: 'hellaspass',
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'mluukkaipass',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, initialUsers, usersInDb }
