const express = require('express')
const router = express.Router()
const currencyController = require('../controllers/currency-controller')

router.post('/api/get-exchange-rates', currencyController.exchange)

module.exports = router