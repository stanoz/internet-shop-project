const mongoose = require('mongoose')
const Schema = mongoose.Schema

const discountSchema = new Schema({
    code: {
        type: String,
        required: true,
        index: true,
    },
    value: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Discount', discountSchema)