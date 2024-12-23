const express = require('express')
const productController = require('../controllers/product-controller')

const router = express.Router()

router.get('/get-all', productController.getAll)

router.get('/get-product/:productId', productController.getProduct)

router.post('/add-sample-products', productController.addSampleProducts)

module.exports = router