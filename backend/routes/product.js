const express = require('express')
const productController = require('../controllers/product-controller')
const authenticate = require('../security/authenticateJWT')
const validationExceptionHandler = require('../utils/validation-exception-handler')
const {addReviewValidationRules} = require("./validators/review-validator");
const axios = require('axios')

const router = express.Router()

router.get('/get-all', productController.getAll)

router.get('/search', productController.searchProducts)

router.get('/get-product/:productId', productController.getProduct)

router.post('/add-sample-products', productController.addSampleProducts)

router.post('/add-review/:productId', authenticate, addReviewValidationRules, validationExceptionHandler, productController.addReview)

router.get('/view-all', async (req, res) => {
    const response = await axios.get('http://localhost:3000/products/get-all')
    const products = response.data.data

    res.render('products', {
        products,
    })
})

router.get('/:id', async (req, res) => {
    const productId = req.params.id
    const response = await axios.get(`http://localhost:3000/products/get-product/${productId}`)
    const product = response.data.data

    res.render('product-details', {
        product,
    })
})


module.exports = router