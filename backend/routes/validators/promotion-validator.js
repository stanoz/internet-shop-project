const {check} = require('express-validator')

const addPromotionValidator = [
    check('scope')
        .trim().notEmpty().withMessage('Category scope is required!')
        .isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('percentageDiscount')
        .isInt({gt: 0}).withMessage('Promotion value must be an integer greater than 0!')
]

const editPromotionValidator = [
    check('scope').optional()
        .trim().notEmpty().withMessage('Category scope is required!')
        .isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('percentageDiscount').optional()
        .isInt({gt: 0}).withMessage('Promotion value must be an integer greater than 0!')
]

module.exports = {addPromotionValidator, editPromotionValidator}