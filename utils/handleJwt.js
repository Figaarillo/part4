const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const signToken = async (user) => {
  const sign = await jwt.sign(user, JWT_SECRET)
  return sign
}

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { signToken, verifyToken }
