const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')

router.post('/add-product', adminController.addProduct)

router.post('/edit-product/:productId', adminController.editProduct)

router.delete('/delete-product/:productId', adminController.deleteProduct)

module.exports = router