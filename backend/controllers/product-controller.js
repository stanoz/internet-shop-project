const Product = require('../models/product')

exports.getAll = async (req, res, next) => {
    try {
        const products = await Product.find()

        if (Array.isArray(products) && products.lenght > 0) {
            return res.status(200).json({
                message: 'success',
                data: products,
            })
        }

        return res.status(404).json({message: 'Products not found!'})
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.getProduct = async (req, res, next) => {
    const id = req.params.productId || null

    if (id === null) {
        return res.status(400).json({message: 'No id was provided!'})
    }

    try {
        const product = await Product.findById(id)

        if (product === null) {
            return res.status(404).json({message: 'Product not found!'})
        }

        res.status(200).json({
            message: 'success',
            data: product,
        })
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}
