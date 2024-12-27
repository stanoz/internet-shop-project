const Promotion = require('../models/promotion')
const Discount = require('../models/discount')
const User = require('../models/user')
const {sendEmail} = require("../utils/mail-sender");

exports.sendRecommendations = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to send email denied'});
    }
}

exports.sendPromotionsInfo = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to send email denied'});
    }
    try {
        const users = await User.find().select('name email').lean()
        if (!users || users.length === 0) {
            return res.status(404).json({message: 'Users not found!'})
        }

        const promotions = await Promotion.find().select('-_id -__v').lean()
        if (!promotions || promotions.length === 0) {
            return res.status(404).json({message: 'Promotions not found!'})
        }

        const promotionMessage = promotions
            .map(discount => `Code: ${promotions.scope}, Value: ${promotions.percentageDiscount}%`)
            .join('\n');

        await sendEmail(users, 'Promotions', promotionMessage)
        res.status(200).json({message: 'Email(s) sent successfully'})
    } catch (err) {
        next(err)
    }
}

exports.sendDiscounts = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to send email denied'});
    }

    try {
        const users = await User.find().select('name email').lean()
        if (!users || users.length === 0) {
            return res.status(404).json({message: 'Users not found!'})
        }

        const discounts = await Discount.find().select('-_id, -__v').lean()
        if (!discounts || discounts.length === 0) {
            return res.status(404).json({message: 'Discounts not found!'})
        }

        const discountMessage = discounts
            .map(discount => `Code: ${discount.code}, Value: ${discount.value}`)
            .join('\n')

        await sendEmail(users, 'Discounts', discountMessage)
        res.status(200).json({message: 'Email(s) sent successfully'})
    } catch (err) {
        next(err)
    }
}