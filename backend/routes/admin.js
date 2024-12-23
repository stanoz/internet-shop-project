const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const {addProductValidationRules, editProductValidationRules} = require('./validators/product-validator')
const {categoryValidationRules} = require('./validators/category-validator')
const validationExceptionHandler = require('../utils/validation-exception-handler')
const {addDiscountValidator, editDiscountValidator} = require("./validators/discount-validator");
const {addPromotionValidator, editPromotionValidator} = require("./validators/promotion-validator");

router.post('/add-product', addProductValidationRules, validationExceptionHandler, adminController.addProduct)

router.put('/edit-product/:productId', editProductValidationRules, validationExceptionHandler, adminController.editProduct)

router.delete('/delete-product/:productId', adminController.deleteProduct)

router.post('/add-category', categoryValidationRules, validationExceptionHandler, adminController.addCategory)

router.put('/edit-category/:categoryId', categoryValidationRules, validationExceptionHandler, adminController.editCategory)

router.delete('/delete-category/:categoryId', adminController.deleteCategory)

router.delete('/delete-user/:userId', adminController.deleteUser)

router.post('/add-discount', addDiscountValidator, validationExceptionHandler, adminController.addDiscount)

router.put('/edit-discount/:discountId', editDiscountValidator, validationExceptionHandler, adminController.editDiscount)

router.delete('/delete-discount/:discountId', adminController.deleteDiscount)

router.post('/add-promotion', addPromotionValidator, validationExceptionHandler, adminController.addPromotion)

router.put('/edit-promotion/:promotionId', editPromotionValidator, validationExceptionHandler, adminController.editPromotion)

router.delete('/delete-promotion/:promotionId', adminController.deletePromotion)

module.exports = router