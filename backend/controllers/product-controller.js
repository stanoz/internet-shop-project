const Product = require('../models/product')
const Order = require('../models/order')
const addProducts = require('../data/add-products')

exports.getAll = async (req, res, next) => {

    try {
        const products = await Product.find().populate('category', 'name').lean()

        if (Array.isArray(products) && products.length > 0) {
            const transformedProducts = products.map(({...product}) => ({
                ...product,
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

        const {_id, ...rest} = product;
        const transformedProduct = {...rest, id: _id, category: product.category.name};

        res.status(200).json({message: 'success', data: transformedProduct})
    } catch (err) {
        next(err)
    }
}

exports.searchProducts = async (req, res, next) => {
console.log('search products')
    try {
        const params = {
            category: req.query.category || null,
            minPrice: Number(req.query.minPrice) || null,
            maxPrice: Number(req.query.maxPrice) || null,
            sizes: req.query.sizes ? req.query.sizes.split(',') : null,
            title: req.query.title || null,
            sort: req.query.sort || 'none'
        }
        console.log(params)
        const products = await Product.find().populate('category', 'name').lean()

        if (Array.isArray(products) && products.length > 0) {
            const transformedProducts = products.map(({...product}) => ({
                ...product,
                category: product.category.name
            }))

            const filteredProducts = transformedProducts.filter(product => {
                return (
                    (params.category === 'all' || !params.category || product.category === params.category) &&
                    (!params.minPrice || product.price >= params.minPrice) &&
                    (!params.maxPrice || product.price <= params.maxPrice) &&
                    (!params.sizes || params.sizes.includes(product.size)) &&
                    (!params.title || product.title.includes(params.title))
                )
            })

            if (params.sort === 'price-ascending') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (params.sort === 'price-descending') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            if (!filteredProducts.length) {
                return res.status(404).json({message: "No products match params!"})
            }

            return res.status(200).json({message: 'success', data: filteredProducts})
        }

        res.status(404).json({message: 'Products not found!'})

    } catch (err) {
        next(err)
    }
}

exports.addReview = async (req, res, next) => {
    const productId = req.params.productId
    if (productId === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const productFromDb = await Product.findById({_id: productId}).lean()
        if (!productId) {
            return res.status(404).json({message: 'Product not found!'})
        }

        const userEmail = req.body.author
        const orders = await Order.find().lean()
        if (!orders || orders.length === 0) {
            throw new Error('There are no orders!')
        }

        let userHasBoughtThisProduct = false
        for (const order of orders) {
            if (order.user.email === userEmail) {
                if (order.cart.items.some(item => item.product.toString() === productId)) {
                    userHasBoughtThisProduct = true
                    break
                }
            }
        }

        if (!userHasBoughtThisProduct) {
            return res.status(400).json({message: 'You can add review only to products that you have bought'})
        }

        const review = req.body
        const editedProduct = {
            ...productFromDb,
            reviews: [...productFromDb.reviews, review]
        }

        const updatedProduct = await Product.findByIdAndUpdate({_id: productId}, {...editedProduct}, {new: true}).lean()
        if (!updatedProduct) {
            return res.status(409).json({message: 'Failed to add review to product'})
        }

        res.status(201).json({message: 'Review added successfully', data: updatedProduct._id})
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