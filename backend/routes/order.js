const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order-controller')
const authenticate = require('../security/authenticateJWT')
const validationExceptionHandler = require('../utils/validation-exception-handler')
const {addOrderValidationRules} = require("./validators/order-validator");

router.post('/create-order', addOrderValidationRules, validationExceptionHandler, orderController.createOrder)

router.put('/edit-order/:orderId', authenticate, orderController.editOrder)

router.get('/get-order/:orderId', orderController.getOrder)

module.exports = router