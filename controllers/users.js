const User = require('../model/user')
const logger = require('../utils/logger')
const { encrypt, compare } = require('../utils/handlePassword')
const handleHTTPError = require('../utils/handleHTTPError')
const { signToken } = require('../utils/handleJwt')

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
  try {
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
  } catch (error) {
    handleHTTPError(res, 'error registering user', 401)
    logger.error(error)
  }
}

const loginUser = async (req, res) => {
  try {
    const body = req.body

    const user = await User.findOne({ username: body.username })

    if (!user) {
      return handleHTTPError(res, 'user not found', 404)
    }

    const correctPassword = compare(body.password, user.passwordHash)

    if (!(user && correctPassword)) {
      return handleHTTPError(res, 'password or user mismatch', 401)
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const data = {
      token: await signToken(userForToken),
      username: user.username,
      name: user.name,
    }

    res.status(200)
    return res.send({ data }).end()
  } catch (error) {
    handleHTTPError(res, 'error login user')
    logger.error(error)
  }
}

module.exports = { getUsers, registerUser, loginUser }
