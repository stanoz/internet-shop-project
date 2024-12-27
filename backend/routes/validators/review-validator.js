const {check} = require('express-validator')

const addReviewValidationRules = [
    check('author')
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('rate')
        .isFloat({ gt: 0 }).withMessage('Rate must be a number greater than 0!'),
    check('description')
        .notEmpty().withMessage('Description must not be empty!')
        .trim().isLength({ max: 255 }).withMessage('Maximum length is 255 characters!'),
]

module.exports = {addReviewValidationRules}