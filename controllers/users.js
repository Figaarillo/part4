const User = require('../model/user')
const { encrypt } = require('../utils/handlePassword')

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

module.exports = registerUser
