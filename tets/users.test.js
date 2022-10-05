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

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { username, name, passwordHash } = response.body

    // check that the username is the one sent
    expect(username).toContain('figarillo')

    // check that the  name is the one sent
    expect(name).toContain('axel')

    // check that the password is not returned
    expect(passwordHash).toBe(undefined)

    const { body: users } = await api.get('/api/users').expect(200)

    // check that the user was saved successfully
    expect(users).toHaveLength(3)
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
