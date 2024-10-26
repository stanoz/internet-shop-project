const {check} = require('express-validator')

const productValidationRules = () => [
    check('title')
        .notEmpty().withMessage('Title must not be empty!')
        .trim().isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('description')
        .notEmpty().withMessage('Description must not be empty!')
        .trim().isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('category').optional(),
    check('category.name')
        .if(check('category').exists())
        .notEmpty().withMessage('Category name must not be empty!')
        .trim().isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('image')
        .notEmpty().withMessage('Image must not be empty!')
        .trim().isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('price')
        .isNumeric({no_symbols: true}).withMessage('Price must be a number')
        .custom((value) => {
            if (value <= 0) {
                throw new Error('Price must be greater than 0!')
            }

            if (!/^\d+(\.\d{2})?$/.test(value)) {
                throw new Error('Price must have exactly 2 digits after the decimal point!');
            }

            return true;
        }),
    check('quantity')
        .isNumeric({no_symbols: true}).withMessage('Quantity must be a number')
        .custom((value) => {
            if (value <= 0) {
                throw new Error('Quantity must be greater than 0!')
            }
            if (!Number.isInteger(Number(value))) {
                throw new Error('Quantity must be an integer!')
            }
            return true
        }),
    check('reviews').optional(),
    check('reviews.author')
        .if(check('reviews').exists())
        .notEmpty().withMessage('Author must not be empty!')
        .trim().isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
    check('reviews.rate')
        .if(check('reviews').exists())
        .isNumeric({no_symbols: true}).withMessage('Price must be a number')
        .custom((value) => {
            if (value <= 0) {
                throw new Error('Rate must be greater than 0!')
            }
            return true
        }),
    check('reviews.description')
        .if(check('reviews').exists())
        .notEmpty().withMessage('Description must not be empty!')
        .trim().isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
]

module.exports = {productValidationRules}