const { check } = require('express-validator');

const addOrderValidationRules = [
    check('user').isObject().withMessage('User must be an object!'),
    check('user.name')
        .trim().isEmpty().withMessage('Name is required!')
        .isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('user.surname')
        .trim().isEmpty().withMessage('Surname is required!')
        .isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('user.email')
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('cart')
        .isObject().withMessage('Cart must be an object!'),
    check('cart.items')
        .isArray({min: 1}).withMessage('Items must be and array!'),
    check('delivery').isObject().withMessage('Delivery must be an object!'),
    check('delivery.method')
        .trim().isEmpty().withMessage('Delivery method is required!')
        .isLength({max: 12}).withMessage('Permitted values: INPOST or DELIVERY_MAN or POST'),
    check('delivery.status')
        .trim().isEmpty().withMessage('Delivery method is required!')
        .isLength({max: 10}).withMessage('Permitted values: WAITING, IN_TRANSIT, DELIVERED'),
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
        .trim().isEmpty().withMessage('If no discount is applied do not provide this field!'),
    check('appliedPromotion').optional()
        .trim().isEmpty().withMessage('If no promotion is applied do not provide this field!')
]

module.exports = {addOrderValidationRules}