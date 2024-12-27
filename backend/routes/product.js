const express = require('express')
const productController = require('../controllers/product-controller')
const authenticate = require('../security/authenticateJWT')
const validationExceptionHandler = require('../utils/validation-exception-handler')
const {addReviewValidationRules} = require("./validators/review-validator");

const router = express.Router()

router.get('/get-all', productController.getAll)

router.get('/search', productController.searchProducts)

router.get('/get-product/:productId', productController.getProduct)

router.post('/add-sample-products', productController.addSampleProducts)

router.post('/add-review/:productId', authenticate, addReviewValidationRules, validationExceptionHandler, productController.addReview)

module.exports = router