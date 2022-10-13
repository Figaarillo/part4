const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const signToken = async (user) => {
  const sign = await jwt.sign(user, JWT_SECRET)
  return sign
}

module.exports = { signToken }
