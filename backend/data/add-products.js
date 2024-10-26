const path = require('path');
const SAMPLE_PRODUCTS = require(path.join(__dirname, 'products.json'));
const Product = require('../models/product');
const Category = require('../models/category');

module.exports = async function addProducts() {
    try {
        if (!Array.isArray(SAMPLE_PRODUCTS)) {
            throw new Error("SAMPLE_PRODUCTS is not an array");
        }

        for (const productSchema of SAMPLE_PRODUCTS) {
            let category = await Category.findOne({ name: productSchema.category });
            if (!category) {
                category = new Category({ name: productSchema.category });
                await category.save();
            }

            const newProduct = new Product({
                ...productSchema,
                category: category._id
            });
            await newProduct.save();
        }
    } catch (err) {
        console.error("Error saving products:", err);
    }
}