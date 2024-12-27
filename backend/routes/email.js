const express = require('express')
const router = express.Router()
const emailController = require('../controllers/email-controller')

router.post('/recommendations', emailController.sendRecommendations)

router.post('/discounts', emailController.sendDiscounts)

router.post('/promotions', emailController.sendPromotionsInfo)

module.exports = router