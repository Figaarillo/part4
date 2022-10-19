const User = require('../model/user')

/**
 * verifies that the user is correct. If something is not fulfilled, it returns an error code and a message. If there is no error, it continues
 */
const validateUserToRegister = async (req, res, next) => {
  const { username, password } = req.body

  // validate that username and password are not empty
  if (!username || !password) {
    res.status(401)
    return res.json({ error: 'username or password are empty' }).end()
  }

  const users = await User.find({})
  users.map((user) => user.toJSON())

  // validate that usernames is not already in the database
  for (const user of users) {
    if (user.username === username) {
      res.status(401)
      return res.json({ error: 'username to be unique' }).end()
    }
  }

  if (username.length < 3 || password.length < 3) {
    res.status(401)
    return res
      .json({
        error: 'username or password must be at least 3 characters long',
      })
      .end()
  }

  next()
}

module.exports = validateUserToRegister
