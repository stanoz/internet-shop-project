const Cart = require('../models/cart')
const User = require('../models/user')
const Product = require('../models/product')

exports.getUsersCart = async (req, res, next) => {
    const userId = req.params.userId || null

    if (userId === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const checkUser = await User.exists({_id: userId})
        if (!checkUser) {
            return res.status(404).json({message: 'User with given id not found!'})
        }
    } catch (err) {
        return next(err)
    }

    try {
        const cart = await Cart.findOne({userId}).populate('items.product', '-reviews -quantity').lean()

        if (!cart) {
            return res.status(404).json({message: 'Cart not found!'})
        }

        res.status(200).json({message: 'success', data: cart})

    } catch (err) {
        next(err)
    }
}

exports.createCart = async (req, res, next) => {
    const userId = req.params.userId || null

    if (userId === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const checkUser = await User.exists({_id: userId})
        if (!checkUser) {
            return res.status(404).json({message: 'User with given id not found!'})
        }
        const cartCheck = await Cart.exists({userId})
        if (cartCheck) {
            return res.status(400).json({message: 'User already has a cart! Use edit cart method'})
        }

    } catch (err) {
       return  next(err)
    }

    try {

        const products = req.body.products

        if (!products || products.length === 0) {
            return res.status(400).json({message: 'No products provided!'})
        }

        for (const product of products) {
            const productFromDb = await Product.findById(product.id).lean();
            if (!productFromDb) {
                throw new Error(`Product with id ${product.id} not found!`);
            }
            if (productFromDb.quantity < product.quantity) {
                throw new Error(`Insufficient stock for product: ${productFromDb.title}`);
            }
        }

        const items = products.map(product => ({
            product: product.id,
            quantity: product.quantity,
        }));

        const cartToDb = new Cart({
            userId,
            items,
        });

        await cartToDb.save()

        res.status(201).json({message: 'Cart created successfully'})

    } catch (err) {
        next(err)
    }
}

exports.editCart = async (req, res, next) => {
    const userId = req.params.userId || null

    if (userId === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const userFromDb = await User.findById({_id: userId}).lean()
        if (!userFromDb) {
            return res.status(404).json({message: 'User with given id not found!'})
        }

        if (userFromDb.email !== req.user.email) {
            return res.status(403).json({message: 'You can only edit your own cart'})
        }

    } catch (err) {
        return next(err)
    }

    try {
        const cart = await Cart.findOne({userId}).populate('items.product', '-reviews -quantity').lean()

        if (!cart) {
            return res.status(404).json({message: 'Cart not found!'})
        }

        const updatedProducts = req.body.products

        for (const product of updatedProducts) {
            const productFromDb = await Product.findById(product.id).lean();
            if (!productFromDb) {
                throw new Error(`Product with id ${product.id} not found!`);
            }
            if (productFromDb.quantity < product.quantity) {
                throw new Error(`Insufficient stock for product: ${productFromDb.title}`);
            }
        }

        const items = updatedProducts.map(product => ({
            product: product.id,
            quantity: product.quantity,
        }));

        const updatedCart = await Cart.findOneAndUpdate({userId}, {items}, {new: true})

        if (!updatedCart) {
            return res.status(409).json({message: 'Failed to update cart'})
        }

        res.status(200).json({message: 'Cart updated successfully'})

    } catch (err) {
        next(err)
    }
}