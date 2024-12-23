const {check} = require('express-validator')

const addDiscountValidator = [
    check('code')
        .trim().notEmpty().withMessage('Code name is required!')
        .isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('value')
        .isInt({gt: 0}).withMessage('Discount value must be an integer greater than 0!')
]

const editDiscountValidator = [
    check('code').optional()
        .trim().notEmpty().withMessage('Code name is required!')
        .isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('value').optional()
        .isInt({gt: 0}).withMessage('Discount value must be an integer greater than 0!')
]

module.exports = {addDiscountValidator, editDiscountValidator}