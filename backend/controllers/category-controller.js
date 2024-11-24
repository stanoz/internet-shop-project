const Category = require('../models/category')

exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.find()

        if (Array.isArray(categories) && categories.length > 0) {
            return res.status(200).json({
                message: 'success',
                data: categories,
            })
        }

        return res.status(404).json({message: 'Categories not found!'})
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}