const express = require('express')
const productController = require('../controllers/product-controller')
const exceptionHandler = require('../utils/exception-handler')

const router = express.Router()

router.get('/get-all', productController.getAll)

router.get('/get-product/:productId', productController.getProduct)

router.get('/add-sample-products', exceptionHandler, productController.addSampleProducts)

module.exports = router