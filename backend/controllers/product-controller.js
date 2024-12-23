const Product = require('../models/product')
const addProducts = require('../data/add-products')

exports.getAll = async (req, res, next) => {

    try {
        const products = await Product.find().populate('category', 'name').lean()

        if (Array.isArray(products) && products.length > 0) {
            const transformedProducts = products.map(({_id, ...product}) => ({
                ...product,
                id: _id,
                category: product.category.name
            }));

            return res.status(200).json({message: 'success', data: transformedProducts})
        }

        return res.status(404).json({message: 'Products not found!'})
    } catch (err) {
        next(err)
    }
}

exports.getProduct = async (req, res, next) => {
    const id = req.params.productId || null

    if (id === null) {
        return res.status(400).json({message: 'No id was provided!'})
    }

    try {
        const product = await Product.findById(id).populate('category', 'name').lean()

        if (product === null) {
            return res.status(404).json({message: 'Product not found!'})
        }

        const { _id, ...rest } = product;
        const transformedProduct = { ...rest, id: _id, category: product.category.name };

        res.status(200).json({message: 'success', data: transformedProduct})
    } catch (err) {
        next(err)
    }
}

exports.addSampleProducts = async (req, res, next) => {
    try {
        await addProducts()
        res.status(201).json("Sample products added")
    } catch (err) {
        next(err)
    }
}