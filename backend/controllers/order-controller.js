const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')
const Discount = require('../models/discount')
const Promotion = require('../models/promotion')

exports.createOrder = async (req, res, next) => {
    try {
        let orderToDb = new Order()

        const newOrder = req.body

        const userEmail = newOrder.user.email

        orderToDb.user = {...newOrder.user}

        orderToDb.address = {...newOrder.address}

        const cart = newOrder.cart
        const products = cart.items
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

        orderToDb.cart = {items: items}

        let promotion
        if (newOrder.appliedPromotion) {
            promotion = await Promotion.findById({_id: newOrder.appliedPromotion}).lean()
            orderToDb.appliedPromotion = promotion._id
        }

        const productIds = items.map(item => item.product)
        const productsFromDb = await Product.find({_id: {$in: productIds}}).populate('category', 'name').lean()


        const itemsWithPrices = items.map(item => {
            const product = productsFromDb.find(p => p._id.toString() === item.product);
            if (!product) {
                throw new Error(`Product with id ${item.product} not found`);
            }
            let productPrice = product.price
            if (promotion && promotion.scope === product.category.name) {
                productPrice *= (1 - promotion.percentageDiscount) / 100
            }
            return {
                ...item,
                price: productPrice,
            };
        });

        let totalPrice = itemsWithPrices.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0)

        if (newOrder.appliedDiscount) {
            const discount = await Discount.findById({_id: newOrder.appliedDiscount}).lean()
            totalPrice -= discount.value
            orderToDb.appliedDiscount = discount._id
        }

        orderToDb.payment.price = totalPrice
        orderToDb.payment.method = newOrder.payment.method.toUpperCase()

        orderToDb.delivery.method = newOrder.delivery.method.toUpperCase()

        await orderToDb.save()

        res.status(201).json({message: 'Order created successfully!', data: orderToDb._id})

    } catch (err) {
        next(err)
    }
}

exports.editOrder = async (req, res, next) => {

}

exports.getOrder = async (req, res, next) => {
    const orderId = req.params.orderId

    if (orderId === null) {
        return res.status(400).json({message: 'Id is invalid!'})
    }

    try {
        const orderFromDb = await Order
            .findById({_id: orderId})
            .populate('cart.items.product', '-quantity -reviews -__v')
            .lean()

        if (!orderFromDb) {
            return res.status(404).json({message: 'Order not found!'})
        }

        res.status(200).json({message: 'success', data: orderFromDb})
    } catch (err) {
        next(err)
    }
}