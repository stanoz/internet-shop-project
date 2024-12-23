const express = require('express')
const router = express.Router()
const discountController = require('../controllers/discount-controller')

router.get('/get-all', discountController.getAll)

module.exports = router