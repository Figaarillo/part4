const { Router } = require('express')
const { getUsers, registerUser, loginUser } = require('../controllers/users')
const validateUserToRegister = require('../middlewares/validateUserToRegister')

const router = Router()

router.get('/', getUsers)

router.post('/register', validateUserToRegister, registerUser)

router.post('/login', loginUser)

module.exports = router
