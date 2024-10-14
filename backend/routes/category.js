const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category-controller')

router.get('/get-all', categoryController.getAll)

module.exports = router