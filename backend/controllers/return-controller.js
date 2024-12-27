const Order = require('../models/order')
const Return = require('../models/return')

exports.createReturn = async (req, res, next) => {
    const orderId = req.params.orderId
    if (orderId === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const orderFromDb = await Order.findById({_id: orderId}).populate('userId', 'email').lean()
        if (!orderFromDb) {
            return res.status(404).json({message: 'Order not found!'})
        }

        const userEmail = req.body.email
        if (userEmail !== req.user.email) {
            return res.status(403).json({message: 'You can only apply for a return for your order!'})
        }

        const newReturn = new Return({
            ...req.body,
            orderId,
        })

        await newReturn.save()

        res.status(201).json({message: 'Return created successfully!', data: newReturn._id})

    } catch (err) {
        next(err)
    }
}

exports.getReturn = async (req, res, next) => {
    const returnId = req.params.returnId
    if (returnId === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {

        const returnFromDb = await Return.findById({_id: returnId}).populate('userId orderId', '-user').lean()
        if (!returnFromDb) {
            return res.status(404).json({message: 'Return nor found!'})
        }

        res.status(200).json({message: 'success', data: returnFromDb})

    } catch (err) {
        next(err)
    }
}

exports.getAll = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit order denied'})
    }

    try {
        const returnsArray = await Return.find().lean()
        if (Array.isArray(returnsArray) && orders.length > 0) {
            return res.status(200).json({message: 'success', data: returnsArray})
        }
        res.status(404).json({message: 'Returns not found!'})
    } catch (err) {
        next(err)
    }
}

exports.editReturn = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit order denied'})
    }

    try {
        //TODO: implement
    } catch (err) {
        next(err)
    }
}