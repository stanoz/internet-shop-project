const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order-controller')
const authenticate = require('../security/authenticateJWT')
const validationExceptionHandler = require('../utils/validation-exception-handler')
const {addOrderValidationRules, editOrderValidationRules} = require("./validators/order-validator");

router.post('/create-order', addOrderValidationRules, validationExceptionHandler, orderController.createOrder)

router.put('/edit-order/:orderId', authenticate, editOrderValidationRules, validationExceptionHandler, orderController.editOrder)

router.get('/get-order/:orderId', orderController.getOrder)

router.get('/get-all', authenticate, orderController.getAll)

module.exports = router