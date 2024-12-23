const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart-controller')
const authenticate = require('../security/authenticateJWT')

router.get('/get-cart/:userId', cartController.getUsersCart)

router.post('/create-cart/:userId',authenticate ,cartController.createCart)

module.exports = router