const { Router } = require('express')
const { getUsers, registerUser, loginUser } = require('../controllers/users')
const validatorRegisterUser = require('../validators/users')

const router = Router()

router.get('/', getUsers)

router.post('/register', validatorRegisterUser, registerUser)

router.post('/login', loginUser)

module.exports = router
