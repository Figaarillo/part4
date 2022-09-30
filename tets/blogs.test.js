const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blog1 = new Blog(initialBlogs[0])
  await blog1.save()

  const blog2 = new Blog(initialBlogs[1])
  await blog2.save()
})

describe('Must be condiderate that', () => {
  test('the blogs are returned as json', async () => {
    // check that response code is 200 and content type is 'application json'
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the identification property is named id', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body

    // check that the identification property is not undefined for all blogs.
    blogs.map(({ id }) => expect(id).not.toBe(undefined))
  })

  test('a valid note can be added', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    // check that when adding a new blog, the response code is 201
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogs = response.body

    // check that when adding a new blog, the lenght is initialBlogs length + 1
    expect(blogs).toHaveLength(initialBlogs.length + 1)

    // check that when adding a new blog, the url of the last item in the database is the same as the url of the new blog
    expect(blogs.pop().url).toEqual(newBlog.url)
  })

  test('if a blog is added without the likes property, it will have the value 0', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }

    const response = await api.post('/api/blogs').send(newBlog)

    const blog = response.body

    // check that the likes property is 0
    expect(blog.likes).toBe(0)
  })

  test('if a blog is added without title of url property, it will returned status code 400', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      likes: 20,
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
