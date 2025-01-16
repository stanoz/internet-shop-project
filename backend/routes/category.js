const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category-controller')
const authenticate = require('../security/authenticateJWT')

router.get('/get-all', categoryController.getAll)

router.get('/get-category/:id', authenticate, categoryController.getById)

module.exports = router