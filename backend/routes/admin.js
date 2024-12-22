const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const {productValidationRules} = require('./validators/product-validator')
const {categoryValidationRules} = require('./validators/category-validator')
const exceptionHandler = require('../utils/validation-exception-handler')
const authenticate = require('../security/authenticateJWT')

router.post('/add-product', productValidationRules(), adminController.addProduct)

router.post('/edit-product/:productId', productValidationRules(), adminController.editProduct)

router.delete('/delete-product/:productId', adminController.deleteProduct)

router.post('/add-category', categoryValidationRules(), adminController.addCategory)

router.post('/edit-category/:categoryId', categoryValidationRules(), adminController.editCategory)

router.delete('/delete-category/:categoryId', adminController.deleteProduct)

module.exports = router