const Product = require('../models/product');
const Category = require('../models/category')

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

        let category = await Category.findOne({ name: newProduct.category });

        if (!category) {
            category = new Category({ name: newProduct.category });
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