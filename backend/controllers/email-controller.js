const Promotion = require('../models/promotion')
const Discount = require('../models/discount')
const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')
const {sendEmail} = require("../utils/mail-sender")

exports.sendRecommendations = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({ message: 'Permission to send email denied' });
    }

    try {
        const users = await User.find().select('name email').lean();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Users not found!' });
        }

        for (const user of users) {
            const lastOrder = await Order.findOne({ 'user.email': user.email })
                .sort({ _id: -1 })
                .populate('cart.items.product', 'category title price')
                .lean();

            if (!lastOrder || !lastOrder.cart.items.length) {
                console.log(`No orders for user: ${user.email}`)
                continue
            }

            const categoryId = lastOrder.cart.items[0].product.category

            const recommendedProducts = await Product.find({ category: categoryId })
                .limit(3)
                .select('title price image')
                .lean()

            if (!recommendedProducts || recommendedProducts.length === 0) {
                console.log(`No recommendations available for user: ${user.email}`)
                continue
            }

            const recommendationMessage = recommendedProducts
                .map(
                    (product, index) =>
                        `${index + 1}. ${product.title} - $${product.price}\nImage: ${product.image}`
                )
                .join('\n\n')

            const message = `Hi ${user.name},\n\nBased on your last purchase, we thought you might like these:\n\n${recommendationMessage}\n\nHappy shopping!\nYour Shop Team`

            try {
                await sendEmail([{ name: user.name, email: user.email }], 'Recommended Products', message)
                console.log(`Recommendations sent to ${user.email}`)
            } catch (err) {
                console.error(`Failed to send recommendations to ${user.email}:`, err.message)
            }
        }

        res.status(200).json({ message: 'Recommendations sent successfully!' })
    } catch (err) {
        next(err)
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