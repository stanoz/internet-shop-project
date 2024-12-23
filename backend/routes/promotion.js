const express = require('express')
const router = express.Router()
const promotionController = require('../controllers/promotion-controller')

router.get('/get-all', promotionController.getAll)

module.exports = router