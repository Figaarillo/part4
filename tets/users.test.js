const supertest = require('supertest')
const app = require('../app')
const User = require('../model/user')
const helper = require('./test_helper')

const api = supertest(app)

const initialUsers = helper.initialUsers

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const newUser = new User(user)
    await newUser.save()
  }
})

describe('when registering a new user', () => {
  test('a new user is created in the database and the status code 201 is returned.', async () => {
    const newUser = {
      username: 'figarillo',
      name: 'axel',
      password: 'figapass',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // check that the user was saved successfully
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain(newUser.username)

    // check that the password is not returned
    const passwords = usersAtEnd.map((user) => user.passwordHash)
    passwords.forEach((password) => expect(password).toBe(undefined))
  })
})

describe('when started', () => {
  test('there are initially two saved notes', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const users = response.body

    // check that the returned users are two
    expect(users).toHaveLength(2)
  })
  test('the returned content must be correct', async () => {
    const response = await api.get('/api/users')

    const users = response.body

    // check that the returned format is correct
    expect(users).toMatchObject([
      {
        username: 'hellas',
        name: 'Arto Hellas',
      },
      {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
      },
    ])
  })
})

describe('Adding a new user fails', () => {
  test('if the username or password is not provided', async () => {
    const newUsers = {
      username: '',
      name: 'Axel',
      password: '',
    }

    const response = await api
      .post('/api/users')
      .send(newUsers)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('username or password are empty')
  })

  test('if user is already added', async () => {
    const newUsers = {
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'hellaspassword',
    }

    const response = await api
      .post('/api/users')
      .send(newUsers)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('username to be unique')
  })

  test('if the username or password are very short', async () => {
    const newUsers = {
      username: 'fi',
      name: 'Axel',
      password: 'fi',
    }

    const response = await api
      .post('/api/users')
      .send(newUsers)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain(
      'username or password must be at least 3 characters long'
    )
  })
})
