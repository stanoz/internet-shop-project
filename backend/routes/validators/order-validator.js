const {check} = require('express-validator');

const addOrderValidationRules = [
    check('user').isObject().withMessage('User must be an object!'),
    check('user.name')
        .trim().notEmpty().withMessage('Name is required!')
        .isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('user.surname')
        .trim().notEmpty().withMessage('Surname is required!')
        .isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('user.email')
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('cart')
        .isObject().withMessage('Cart must be an object!'),
    check('cart.items')
        .isArray({min: 1}).withMessage('Items must be and array!'),
    check('payment').isObject().withMessage('Payment must be an object!'),
    check('payment.method')
        .trim().notEmpty().withMessage('Payment method is required!')
        .isLength({min: 4, max: 13}).withMessage('Permitted values: BLIK or CREDIT_CARD or BANK_TRANSFER'),
    check('delivery').isObject().withMessage('Delivery must be an object!'),
    check('delivery.method')
        .trim().notEmpty().withMessage('Delivery method is required!')
        .isLength({min: 4, max: 12}).withMessage('Permitted values: INPOST or DELIVERY_MAN or POST'),
    check('address').isObject().withMessage('Address must be an object!'),
    check('address.street')
        .if(check('address').exists())
        .notEmpty().withMessage('Street is required'),
    check('address.city')
        .if(check('address').exists())
        .notEmpty().withMessage('City is required'),
    check('address.state')
        .if(check('address').exists())
        .notEmpty().withMessage('State is required'),
    check('address.zip')
        .if(check('address').exists())
        .notEmpty().withMessage('Zip code is required')
        .isPostalCode('any').withMessage('Zip code must be a valid postal code'),
    check('appliedDiscount').optional()
        .trim().notEmpty().withMessage('If no discount is applied do not provide this field!'),
    check('appliedPromotion').optional()
        .trim().notEmpty().withMessage('If no promotion is applied do not provide this field!')
]
const editOrderValidationRules = [
    check('orderStatus').optional()
        .trim().notEmpty().withMessage('OrderShowCart status is required!')
        .isLength({min: 7, max: 10}).withMessage('Permitted values: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED'),
    check('cart').optional()
        .isObject().withMessage('Cart must be an object!'),
    check('cart.items').optional()
        .isArray({min: 1}).withMessage('Items must be and array!'),
    check('payment').optional()
        .isObject().withMessage('Payment must be an object!'),
    check('payment.paymentStatus').optional()
        .trim().notEmpty().withMessage('Payment status is required!')
        .isLength({min: 4, max: 8}).withMessage('Permitted values: NOT_PAID, PAID, FAILED'),
    check('delivery').optional()
        .isObject().withMessage('Delivery must be an object!'),
    check('delivery.deliveryStatus').optional()
        .trim().notEmpty().withMessage('Delivery status is required!')
        .isLength({min: 7, max: 10}).withMessage('Permitted values: WAITING, IN_TRANSIT, DELIVERED'),
]

module.exports = {addOrderValidationRules, editOrderValidationRules}