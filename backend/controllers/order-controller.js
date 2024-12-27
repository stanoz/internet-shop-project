const Order = require('../models/order')
const Product = require('../models/product')
const Discount = require('../models/discount')
const Promotion = require('../models/promotion')
const {calculateOrderPrice} = require("../utils/order-utils");
const {sendEmail} = require("../utils/mail-sender");

exports.createOrder = async (req, res, next) => {
    try {
        let orderToDb = new Order()

        const newOrder = req.body

        orderToDb.user = {...newOrder.user}

        orderToDb.address = {...newOrder.address}

        const cart = newOrder.cart
        const products = cart.items
        if (!products || products.length === 0) {
            return res.status(400).json({message: 'No products provided!'})
        }

        for (const product of products) {
            const productFromDb = await Product.findById(product.id).lean()
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
        }))

        orderToDb.cart = {items: items}

        let promotion
        if (newOrder.appliedPromotion) {
            promotion = await Promotion.findById({_id: newOrder.appliedPromotion}).lean()
            orderToDb.appliedPromotion = promotion._id
        }

        let discount
        if (newOrder.appliedDiscount) {
            discount = await Discount.findById({_id: newOrder.appliedDiscount}).lean()
            orderToDb.appliedDiscount = discount._id
        }

        orderToDb.payment.price = await calculateOrderPrice(items, discount, promotion)
        orderToDb.payment.method = newOrder.payment.method.toUpperCase()

        orderToDb.delivery.method = newOrder.delivery.method.toUpperCase()

        await orderToDb.save()

        const emailBody = `
        Hi ${orderToDb.user.name},

        Thank you for your order! Here are the details:

        Order ID: ${orderToDb._id}
        Order Status: PENDING
        Total Price: $${orderToDb.payment.price}
        Payment Method: ${orderToDb.payment.method}
        Payment Status: ${orderToDb.payment.paymentStatus}
        Delivery Method: ${orderToDb.delivery.method}
        Delivery Status: ${orderToDb.delivery.deliveryStatus}
        Address: 
            ${orderToDb.address.street}, 
            ${orderToDb.address.city}, 
            ${orderToDb.address.state} ${orderToDb.address.zip}

        Items:
        ${orderToDb.cart.items.map((item, index) => {
            return `   ${index + 1}. Product ID: ${item.product}, Quantity: ${item.quantity}`
        }).join('\n')}

        ${promotion ? `Promotion Applied: ${promotion.code}` : ''}
        ${discount ? `Discount Applied: ${discount.code}` : ''}

        Thank you for shopping with us!
        - Your Shop Team
        `

        sendEmail([{ name: orderToDb.user.name, email: orderToDb.user.email }], 'New Order Created!', emailBody)

        res.status(201).json({message: 'Order created successfully!', data: orderToDb._id})

    } catch (err) {
        next(err)
    }
}

exports.editOrder = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit order denied'})
    }

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

        const editOrder = req.body

        const orderStatusEnum = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
        const paymentStatusEnum = ['NOT_PAID', 'PAID', 'FAILED']
        const deliveryStatusEnum = ['WAITING', 'IN_TRANSIT', 'DELIVERED']

        if (editOrder.orderStatus && !orderStatusEnum.includes(editOrder.orderStatus.toUpperCase())) {
            return res.status(400).json({message: 'Order status is not valid!'})
        }

        if (editOrder.payment && editOrder.payment.paymentStatus && !paymentStatusEnum.includes(editOrder.payment.paymentStatus.toUpperCase())) {
            return res.status(400).json({message: 'Payment status is not valid!'})
        }

        if (editOrder.delivery && editOrder.delivery.deliveryStatus && !deliveryStatusEnum.includes(editOrder.delivery.deliveryStatus.toUpperCase())) {
            return res.status(400).json({message: 'Delivery status is not valid!'})
        }

        if (editOrder.cart?.items) {
            const products = editOrder.cart.items
            const items = products.map(product => ({
                product: product.id,
                quantity: product.quantity,
            }))
            for (const item of products) {
                const productFromDb = await Product.findById({_id: item.id}).lean()
                if (!productFromDb) {
                    return res.status(404).json({message: `Product with id ${item.id} not found!`})
                }
                if (productFromDb.quantity < item.quantity) {
                    return res.status(400).json({message: `Insufficient stock for product: ${productFromDb.title}`})
                }
            }
            let discount
            if (orderFromDb.appliedDiscount) {
                discount = await Discount.findById({_id: orderFromDb.appliedDiscount}).lean()
            }

            let promotion
            if (orderFromDb.appliedPromotion) {
                promotion = await Promotion.findById({_id: orderFromDb.appliedPromotion}).lean()
            }
            editOrder.payment.price = await calculateOrderPrice(items, discount, promotion)
        }


        const editedOrder = {
            ...orderFromDb,
            ...editOrder,
            payment: {
                ...orderFromDb.payment,
                ...editOrder.payment
            },
            delivery: {
                ...orderFromDb.delivery,
                ...editOrder.delivery
            },
            cart: {
                items: orderFromDb.cart.items.map((item, index) => ({
                    ...item,
                    ...editOrder.cart.items[index]
                }))
            }
        }

        const updatedOrder = await Order.findByIdAndUpdate({_id: orderId}, {...editedOrder}, {new: true}).lean()

        if (!updatedOrder) {
            return res.status(409).json({message: 'Failed to update order'})
        }

        const emailBody = `
        Hi ${updatedOrder.user.name},

        Status of your Order has changed! Here are the details:

        Order ID: ${updatedOrder._id}
        Order Status: ${updatedOrder.orderStatus}
        Total Price: $${updatedOrder.payment.price}
        Payment Method: ${updatedOrder.payment.method}
        Payment Status: ${updatedOrder.payment.paymentStatus}
        Delivery Method: ${updatedOrder.delivery.method}
        Delivery Status: ${updatedOrder.delivery.deliveryStatus}
        Address: 
            ${updatedOrder.address.street}, 
            ${updatedOrder.address.city}, 
            ${updatedOrder.address.state} ${updatedOrder.address.zip}

        Items:
        ${updatedOrder.cart.items.map((item, index) => {
            return `   ${index + 1}. Product ID: ${item.product}, Quantity: ${item.quantity}`
        }).join('\n')}

        Thank you for shopping with us!
        - Your Shop Team
        `

        sendEmail([{ name: updatedOrder.user.name, email: updatedOrder.user.email }], 'Order Status Changed!', emailBody)

        res.status(200).json({message: 'Oder updated successfully', data: updatedOrder._id})

    } catch (err) {
        next(err)
    }
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

exports.getAll = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit order denied'})
    }

    try {
        const orders = await Order.find().lean()
        if (Array.isArray(orders) && orders.length > 0) {
            return res.status(200).json({message: 'success', data: orders})
        }
        res.status(404).json({message: 'Orders not found!'})

    } catch (err) {
        next(err)
    }
}