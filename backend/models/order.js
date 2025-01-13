const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderStatus: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING'
    },
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
            enum: ['NOT_PAID', 'PAID', 'FAILED'],
            default: 'NOT_PAID'
        },
        method: {
            type: String,
            enum: ['CREDIT_CARD', 'BLIK', 'BANK_TRANSFER'],
            required: true,
        }
    },
    delivery: {
        method: {
            type: String,
            required: true,
            enum: ['INPOST', 'DELIVERY_MAN', 'POST']
        },
        deliveryStatus: {
            type: String,
            enum: ['WAITING', 'IN_TRANSIT', 'DELIVERED'],
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
    },
    appliedDiscount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
    },
    appliedPromotion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promotion',
    }
})

module.exports = mongoose.model('OrderShowCart', orderSchema)