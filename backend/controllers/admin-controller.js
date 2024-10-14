const Product = require("../models/product");

exports.addProduct = async (req, res, next) => {
    const product = req.body
    //TODO: validate

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
    //TODO: validate

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