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
    const users = await helper.usersInDb()

    const { id: user } = users[0]

    const newBlog = new Blog({ ...blog, user })

    await newBlog.save()
  }
})

describe('when started, there are initially some saved blogs', () => {
  test('the blogs are returned as json', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    // check that response code is 200 and content type is 'application json'
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    const blogs = response.body

    // check that the number of entries is correct
    expect(blogs).toHaveLength(initialBlogs.length)
  })
})

describe('blog properties are correct when', () => {
  test('the identification property is named "id"', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    const blogs = response.body

    // check that the identification property is not undefined for all blogs.
    blogs.map(({ id }) => expect(id).not.toBe(undefined))
  })
})

describe('when a new blog is added', () => {
  test('a valid blog can be added', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    // check that when adding a new blog, the response code is 201
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    const blogs = response.body

    // check that when adding a new blog, the lenght is initialBlogs length + 1
    expect(blogs).toHaveLength(initialBlogs.length + 1)

    // check that when adding a new blog, the url of the last item in the database is the same as the url of the new blog
    expect(blogs.pop().url).toEqual(newBlog.url)
  })

  test('if added without the likes property, it is set to 0', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    const blog = response.body

    // check that the likes property is 0
    expect(blog.likes).toBe(0)
  })

  test('fails with status code 400 if data invalid', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const newBlog = {
      author: 'Robert C. Martin',
      likes: 20,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    // check that status code is correct when send a blog without required properties
    expect(response.status).toBe(400)
  })
})

describe('a blog can be deleted', () => {
  test('can be deleted only by its creator', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    // check that the user can delete his blog
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const token2 = await helper.getToken(api, 'mluukkai', 'mluukkaipass')

    // check that another user cannot delete another user's blog
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token2}`)
      .expect(403)

    const blogsAtEnd = await helper.blogsInDb()

    // check that the number of blogs has decreased
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const deletedBlogUrl = blogsAtEnd.map((blog) => blog.url)

    // check that the url of the deleted blog is not contained in the database
    expect(deletedBlogUrl).not.toContain(blogToDelete.url)
  })

  test('that does not exist can not be deleted', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    await api
      .delete('/api/blogs/123456789')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
})

describe('when a blog is updated', () => {
  test('success if likes field is correct', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const fieldToUpdate = { likes: 10 }

    const response = await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(fieldToUpdate)
      .expect(200)

    const updatedBlog = response.body

    // check that the likes field has been modified
    expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes)

    // check that likes field is 10
    expect(updatedBlog.likes).toBe(10)
  })

  test('fail if likes is a string or a negative number', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const fieldToUpdate = { likes: 'diez' }

    // check that likes field is not string
    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(fieldToUpdate)
      .expect(400)

    fieldToUpdate.likes = -10

    // check that likes field is not negative number
    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(fieldToUpdate)
      .expect(400)
  })
})

describe('verify the format of a new blog', () => {
  test('when a new blog is created, it should display its user', async () => {
    const token = await helper.getToken(api, 'hellas', 'hellaspass')

    const newBlog = {
      title: 'Microservices and the First Law of Distributed Objects',
      author: 'Martin Fowler',
      url: 'http://martinfowler.com/articles/distributed-objects-microservices.html',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body: blogs } = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    const createdBlog = blogs.pop()

    // check that the format of the blog is correct
    expect(createdBlog).toMatchObject({
      title: 'Microservices and the First Law of Distributed Objects',
      author: 'Martin Fowler',
      url: 'http://martinfowler.com/articles/distributed-objects-microservices.html',
      likes: 0,
      user: {
        username: 'hellas',
        name: 'Arto Hellas',
      },
    })

    const { body: users } = await api.get('/api/users')

    // check that the blog id in the user is the same as the created blog
    expect(users[0].blogs[0].id).toEqual(createdBlog.id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
