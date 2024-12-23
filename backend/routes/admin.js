const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const {addProductValidationRules, editProductValidationRules} = require('./validators/product-validator')
const {categoryValidationRules} = require('./validators/category-validator')
const validationExceptionHandler = require('../utils/validation-exception-handler')

router.post('/add-product', addProductValidationRules, validationExceptionHandler, adminController.addProduct)

router.put('/edit-product/:productId', editProductValidationRules, validationExceptionHandler, adminController.editProduct)

router.delete('/delete-product/:productId', adminController.deleteProduct)

router.post('/add-category', categoryValidationRules(), adminController.addCategory)

router.post('/edit-category/:categoryId', categoryValidationRules(), adminController.editCategory)

router.delete('/delete-category/:categoryId', adminController.deleteProduct)

module.exports = router