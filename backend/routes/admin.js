const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const {productValidationRules} = require('./validators/product-validator')
const {categoryValidationRules} = require('./validators/category-validator')
const exceptionHandler = require('../utils/exception-handler')

router.post('/add-product', productValidationRules(), exceptionHandler, adminController.addProduct)

router.post('/edit-product/:productId', productValidationRules(), exceptionHandler, adminController.editProduct)

router.delete('/delete-product/:productId', exceptionHandler, adminController.deleteProduct)

router.post('/add-category', categoryValidationRules(), exceptionHandler, adminController.addCategory)

router.post('/edit-category/:categoryId', categoryValidationRules(), exceptionHandler, adminController.editCategory)

router.delete('/delete-category/:categoryId', exceptionHandler, adminController.deleteProduct)

module.exports = router