const User = require('../model/user')
const logger = require('../utils/logger')
const { encrypt } = require('../utils/handlePassword')

const getUsers = async (_, res) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      url: 1,
      likes: 1,
    })
    return res.send(users).end()
  } catch (error) {
    logger.error(error)
  }
}

const registerUser = async (req, res) => {
  const { username, name, password } = req.body

  const passwordHash = await encrypt(password)

  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await newUser.save()

  res.status(201)

  return res.json(savedUser).end()
}

module.exports = { getUsers, registerUser }
