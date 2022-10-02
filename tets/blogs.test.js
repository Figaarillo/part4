const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const helper = require('./test_helper')

const api = supertest(app)

const initialBlogs = helper.initialBlogs

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    const newBlog = new Blog(blog)
    await newBlog.save()
  }
})

describe('when there is initially some notes saved', () => {
  test('the blogs are returned as json', async () => {
    // check that response code is 200 and content type is 'application json'
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body

    // check that the number of entries is correct
    expect(blogs).toHaveLength(initialBlogs.length)
  })
})

describe('blog properties are correct when', () => {
  test('the identification property is named id', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body

    // check that the identification property is not undefined for all blogs.
    blogs.map(({ id }) => expect(id).not.toBe(undefined))
  })
})

describe('when a new blog is added', () => {
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

  test('if added without the likes property, it is set to 0', async () => {
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

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      likes: 20,
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(400)
  })
})

describe('deletion of a note', () => {
  test('succes with status 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    // check that the number of blogs has decreased
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const blogs = blogsAtEnd.map((blog) => blog.url)

    // check that the url of the deleted blog is not contained in the database
    expect(blogs).not.toContain(blogToDelete.url)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
