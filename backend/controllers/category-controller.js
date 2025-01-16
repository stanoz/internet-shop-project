const Category = require('../models/category')

exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.find().lean()

        if (Array.isArray(categories) && categories.length > 0) {
            return res.status(200).json({
                message: 'success',
                data: categories,
            })
        }

        return res.status(404).json({message: 'Categories not found!'})
    } catch (err) {
        next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const categoryId = req.params.id || null

        if (categoryId === null) {
            return res.status(400).json({message: 'Id is invalid!'})
        }
        const category = await Category.findById({_id: categoryId}).lean()

        if (category) {
            return res.status(200).json({
                message: 'success',
                data: category,
            })
        }

        return res.status(404).json({message: 'Category not found!'})
    } catch (err) {
        next(err)
    }
}