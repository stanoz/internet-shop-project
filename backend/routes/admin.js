const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')

router.post('/add-product', adminController.addProduct)

router.post('/edit-product/:productId', adminController.editProduct)

router.delete('/delete-product/:productId', adminController.deleteProduct)

router.post('/add-category', adminController.addCategory)

router.post('/edit-category/:categoryId', adminController.editCategory)

router.delete('/delete-category/:categoryId', adminController.deleteProduct)

module.exports = router