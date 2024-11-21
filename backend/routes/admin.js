const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const {productValidationRules} = require('./validators/product-validator')
const {categoryValidationRules} = require('./validators/category-validator')
const exceptionHandler = require('../utils/exception-handler')
const authenticate = require('../security/authenticateJWT')

router.post('/add-product', authenticate, productValidationRules(), exceptionHandler, adminController.addProduct)

router.post('/edit-product/:productId', authenticate, productValidationRules(), exceptionHandler, adminController.editProduct)

router.delete('/delete-product/:productId', authenticate, exceptionHandler, adminController.deleteProduct)

router.post('/add-category', authenticate, categoryValidationRules(), exceptionHandler, adminController.addCategory)

router.post('/edit-category/:categoryId',authenticate, categoryValidationRules(), exceptionHandler, adminController.editCategory)

router.delete('/delete-category/:categoryId', exceptionHandler, adminController.deleteProduct)

module.exports = router