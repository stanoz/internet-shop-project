const mongoose = require('mongoose')
const categorySchema = require('category')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: categorySchema,
        ref: 'Category',
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    reviews: {
        type: [{
            author: {
                type: String,
                required: true,
            },
            rate: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: false,
            }
        }],
        required: false,
    },
})

module.exports = mongoose.model('Product', ProductSchema)