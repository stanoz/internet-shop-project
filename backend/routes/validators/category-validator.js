const {check} = require('express-validator')

const categoryValidationRules = [
    check('name')
        .notEmpty().withMessage('Category name must not be empty!')
        .trim().isLength({max: 255}).withMessage('Maximum length is 255 characters!'),
]

module.exports = {categoryValidationRules}