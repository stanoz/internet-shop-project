const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    cart: {
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
            }
        ],
    },
    payment: {
        price: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['NOT PAID', 'PAID', 'FAILED'],
            default: 'NOT PAID'
        },
    },
    delivery: {
        method: {
            type: String,
            required: true,
            enum: ['INPOST, DELIVERY_MAN, POST']
        },
        deliveryStatus: {
            type: String,
            enum: ['WAITING', 'IN TRANSIT', 'DELIVERED'],
            default: 'WAITING'
        }
    },
    address: {
        type: {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zip: {
                type: String,
                required: true,
            },
        },
        required: true,
    }
})

module.exports = mongoose.model('Order', orderSchema)