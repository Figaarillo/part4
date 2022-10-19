const bcrypt = require('bcrypt')

/**
 * receives a plain password and returns the password encrypted by bcrypt.
 * @param {*} plainPassword password without encrypt
 */
const encrypt = async (plainPassword) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(plainPassword, saltRounds)
  return passwordHash
}

/**
 * compare a plain password and hash password and return true if the plain password is equal to the hash password
 */
const compare = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword)
}

module.exports = { encrypt, compare }
