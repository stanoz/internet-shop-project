const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promotionSchema = new Schema({
    scope: {
        type: String,
        required: true,
        index: true,
    },
    percentageDiscount: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Promotion', promotionSchema)