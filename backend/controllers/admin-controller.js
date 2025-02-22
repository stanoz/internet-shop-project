const Product = require('../models/product');
const Category = require('../models/category')
const User = require('../models/user')
const Discount = require('../models/discount')
const Promotion = require('../models/promotion')

exports.addProduct = async (req, res, next) => {
    const newProduct = req.body

    try {
        if (req.user.email !== 'admin@example.com') {
            return res.status(403).json({message: 'Permission to add new product denied'});
        }

        const productCheck = await Product.exists({title: newProduct.title})
        if (productCheck) {
            return res.status(400).json({message: 'Product already exists!'})
        }

        let category = await Category.findOne({name: newProduct.category});

        if (!category) {
            category = new Category({name: newProduct.category});
            await category.save();
        }

        newProduct.category = category._id;

        const productToDb = new Product(newProduct)
        await productToDb.save()

        res.status(201).json({message: 'Product created!'})
    } catch (err) {
        next(err)
    }
}

exports.editProduct = async (req, res, next) => {

    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit product denied'});
    }

    const editProduct = req.body
    const id = req.params.productId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const productCheck = await Product.exists({_id: id})

        if (!productCheck) {
            return res.status(404).json({message: 'Product not found!'})
        }

        if (editProduct.category) {
            let category = await Category.findOne({name: editProduct.category});

            if (!category) {
                category = new Category({name: editProduct.category});
                await category.save();
            }

            editProduct.category = category._id;
        }

        await Product.findByIdAndUpdate(id, editProduct, {new: true})

        res.status(200).json({message: 'Product updated successfully!'})

    } catch (err) {
        next(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to delete product denied'});
    }

    const id = req.params.productId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const productCheck = await Product.exists({_id: id})

        if (!productCheck) {
            return res.status(404).json({message: 'Product not found!'})
        }

        await Product.findByIdAndDelete({_id: id})

        res.status(204).json({message: 'Product deleted successfully!'})
    } catch (err) {
        next(err)
    }
}

exports.addCategory = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to add new category denied'});
    }

    const category = req.body
    try {
        const categoryCheck = await Category.exists({name: category.name})

        if (categoryCheck) {
            return res.status(400).json({message: 'Category already exists!'})
        }

        const categoryToDb = new Category(category)
        await categoryToDb.save()

        res.status(201).json({message: 'Category created!'})
    } catch (err) {
        next(err)
    }
}

exports.editCategory = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit category denied'});
    }

    const id = req.params.categoryId || null
    const category = req.body

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const categoryCheck = await Category.exists({_id: id})

        if (!categoryCheck) {
            return res.status(404).json({message: 'Category not found!'})
        }

        await Category.findByIdAndUpdate(id, category, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({message: 'Category updated successfully!'})
    } catch (err) {
        next(err)
    }
}

exports.deleteCategory = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to delete category denied'});
    }

    const id = req.params.categoryId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const productCheck = await Category.exists({_id: id})

        if (!productCheck) {
            return res.status(404).json({message: 'Product not found!'})
        }

        await Category.findByIdAndDelete({_id: id})

        res.status(204).json({message: 'Category deleted successfully!'})
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to delete user denied'});
    }

    const id = req.params.userId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {

        const userCheck = await User.exists({_id: id})
        if (!userCheck) {
            return res.status(404).json({message: 'User not found!'})
        }

        await User.findByIdAndDelete({_id: id})

        res.status(204).json({message: 'User deleted successfully!'})
    } catch (err) {
        next(err)
    }
}

exports.addDiscount = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission add new discount denied'});
    }

    const newDiscount = req.body
    try {
        const discountCheck = await Discount.exists({name: newDiscount.name})

        if (discountCheck) {
            return res.status(400).json({message: 'Discount already exists!'})
        }

        const discountToDb = new Discount(newDiscount)
        await discountToDb.save()

        res.status(201).json({message: 'Discount created!'})
    } catch (err) {
        next(err)
    }
}

exports.editDiscount = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit discount denied'});
    }

    const id = req.params.discountId || null
    const editedDiscount = req.body

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const discountCheck = await Discount.exists({_id: id})

        if (!discountCheck) {
            return res.status(404).json({message: 'Discount not found!'})
        }

        await Discount.findByIdAndUpdate(id, editedDiscount, {new: true,})

        res.status(200).json({message: 'Discount updated successfully!'})
    } catch (err) {
        next(err)
    }
}

exports.deleteDiscount = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to delete discount denied'});
    }

    const id = req.params.discountId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {

        const discountCheck = await Discount.exists({_id: id})
        if (!discountCheck) {
            return res.status(404).json({message: 'Discount not found!'})
        }

        await Discount.findByIdAndDelete({_id: id})

        res.status(204).json({message: 'Discount deleted successfully!'})
    } catch (err) {
        next(err)
    }
}

exports.addPromotion = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission add new promotion denied'});
    }

    const newPromotion = req.body
    try {
        const promotionCheck = await Promotion.exists({name: newPromotion.name})

        if (promotionCheck) {
            return res.status(400).json({message: 'Promotion already exists!'})
        }

        const promotionToDb = new Promotion(newPromotion)
        await promotionToDb.save()

        res.status(201).json({message: 'Promotion created!'})
    } catch (err) {
        next(err)
    }
}

exports.editPromotion = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit promotion denied'});
    }

    const id = req.params.promotionId || null
    const editedPromotion = req.body

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {
        const promotionCheck = await Promotion.exists({_id: id})

        if (!promotionCheck) {
            return res.status(404).json({message: 'Promotion not found!'})
        }

        await Promotion.findByIdAndUpdate(id, editedPromotion, {new: true,})

        res.status(200).json({message: 'Promotion updated successfully!'})
    } catch (err) {
        next(err)
    }
}

exports.deletePromotion = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to delete promotion denied'});
    }

    const id = req.params.promotionId || null

    if (id === null) {
        return res.status(400).json({message: 'Invalid id!'})
    }

    try {

        const promotionCheck = await Promotion.exists({_id: id})
        if (!promotionCheck) {
            return res.status(404).json({message: 'Promotion not found!'})
        }

        await Promotion.findByIdAndDelete({_id: id})

        res.status(204).json({message: 'Promotion deleted successfully!'})
    } catch (err) {
        next(err)
    }
}