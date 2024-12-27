const mongoose = require('mongoose')
const Schema = mongoose.Schema

const returnSchema = new Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    returnStatus: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'],
        default: 'PENDING',
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Return', returnSchema)