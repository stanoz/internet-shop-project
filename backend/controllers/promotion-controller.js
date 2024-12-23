const Promotion = require('../models/promotion')

exports.getAll = async (req, res, next) => {
    try {
        const promotions = await Promotion.find().lean()

        if (Array.isArray(promotions) && promotions.length > 0) {
            return res.status(200).json({
                message: 'success',
                data: promotions,
            })
        }

        return res.status(404).json({message: 'Promotions not found!'})
    } catch (err) {
        next(err)
    }
}