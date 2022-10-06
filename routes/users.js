const { Router } = require('express')
const registerUser = require('../controllers/users')
const User = require('../model/user')
const validatorRegisterUser = require('../validators/users')

const router = Router()

router.get('/', async (_, res) => {
  try {
    const users = await User.find({})
    return res.send(users).end()
  } catch (error) {
    console.log(error)
  }
})

router.post('/', validatorRegisterUser, registerUser)

module.exports = router
