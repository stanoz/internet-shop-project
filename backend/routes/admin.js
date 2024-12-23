const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const {addProductValidationRules, editProductValidationRules} = require('./validators/product-validator')
const {categoryValidationRules} = require('./validators/category-validator')
const validationExceptionHandler = require('../utils/validation-exception-handler')

router.post('/add-product', addProductValidationRules, validationExceptionHandler, adminController.addProduct)

router.put('/edit-product/:productId', editProductValidationRules, validationExceptionHandler, adminController.editProduct)

router.delete('/delete-product/:productId', adminController.deleteProduct)

router.post('/add-category', categoryValidationRules, validationExceptionHandler, adminController.addCategory)

router.put('/edit-category/:categoryId', categoryValidationRules, validationExceptionHandler, adminController.editCategory)

router.delete('/delete-category/:categoryId', adminController.deleteCategory)

router.delete('/delete-user/:userId', adminController.deleteUser)

module.exports = router