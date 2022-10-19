const User = require('../model/user')
const handleHTTPError = require('../utils/handleHTTPError')
const { verifyToken } = require('../utils/handleJwt')

const tokenExtractor = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')

    if (!authorization) {
      return handleHTTPError(res, 'authorization fail', 401)
    }

    const token = authorization.split(' ').pop()

    const decodedToken = await verifyToken(token)

    if (!decodedToken) {
      return handleHTTPError(res, 'invalid token', 401)
    }

    const user = await User.findById(decodedToken.id)

    req.body.token = user

    next()
  } catch (error) {
    handleHTTPError(res, 'not session', 401)
  }
}

module.exports = tokenExtractor
