const { Router } = require('express')
const { getUsers, registerUser } = require('../controllers/users')
const validatorRegisterUser = require('../validators/users')

const router = Router()

router.get('/', getUsers)

router.post('/', validatorRegisterUser, registerUser)

module.exports = router
