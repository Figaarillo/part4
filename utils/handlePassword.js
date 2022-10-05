const bcrypt = require('bcrypt')

/**
 * receives a plain password and returns the password encrypted by bcrypt.
 * @param {*} plainPassword
 */
const encrypt = async (plainPassword) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(plainPassword, saltRounds)
  return passwordHash
}

module.exports = { encrypt }
