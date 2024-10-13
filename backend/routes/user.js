const express = require('express')
const userController = require('../controllers/user-controller')
const router = express.Router()

router.get('/get-all', userController.getAll)

router.post('/populate-db', userController.populateDb)

router.post('/login',userController.login)

router.post('/register',userController.register)

module.exports = router