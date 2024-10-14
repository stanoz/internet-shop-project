const Product = require('../models/product');
const Category = require('../models/category')

exports.addProduct = async (req, res, next) => {
    const product = req.body

    try {
        const productCheck = await Product.exists(product.id)
        if (productCheck) {
            return res.status(409).json({message: 'Product already exists!'})
        }

        const productToDb = new Product(product)
        await productToDb.save()

        res.status(201).json({message: 'Product created!'})
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.editProduct = async (req, res, next) => {
    const newProduct = req.body
    const id = req.params.productId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const productCheck = await Product.exists(id)

        if (!productCheck) {
            return res.status(404).json({message: 'Product not found!'})
        }

        await Product.findByIdAndUpdate(id, newProduct, {
            new: true,
            runValidators: true,
        })

        res.status(204).json({message: 'Product updated successfully!'})

    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.deleteProduct = async (req, res, next) => {
    const id = req.params.productId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const productCheck = await Product.exists(id)

        if (!productCheck) {
            return res.status(404).json({message: 'Product not found!'})
        }

        await Product.findByIdAndDelete(id)

        res.status(204).json({message: 'Product deleted successfully!'})
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.addCategory = async (req, res, next) => {
    const category = req.body
    try {
        const categoryCheck = await Category.exists(category.name)

        if (!categoryCheck) {
            return res.status(404).json({message: 'Category not found!'})
        }

        const categoryToDb = new Category(category)
        await categoryToDb.save()

        res.status(201).json({message: 'Category created!'})
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.editCategory = async (req, res, next) => {
    const id = req.params.categoryId || null
    const category = req.body

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const categoryCheck = await Category.exists(id)

        if (!categoryCheck) {
            return res.status(404).json({message: 'Category not found!'})
        }

        await Category.findByIdAndUpdate(id, category, {
            new: true,
            runValidators: true,
        })

        res.status(204).json({message: 'Product updated successfully!'})
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.deleteCategory = async (req, res, next) => {
    const id = req.params.categoryId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const productCheck = await Category.exists(id)

        if (!productCheck) {
            return res.status(404).json({message: 'Product not found!'})
        }

        await Category.findByIdAndDelete(id)

        res.status(204).json({message: 'Category deleted successfully!'})
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}