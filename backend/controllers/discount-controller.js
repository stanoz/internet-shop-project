const Discount = require('../models/discount')

exports.getAll = async (req, res, next) => {
    try {
        const discounts = await Discount.find().lean()

        if (Array.isArray(discounts) && discounts.length > 0) {
            return res.status(200).json({
                message: 'success',
                data: discounts,
            })
        }

        return res.status(404).json({message: 'Discounts not found!'})
    } catch (err) {
        next(err)
    }
}