const {check} = require('express-validator');

const updateProfileValidationRules = [
    check('name').optional()
        .notEmpty().withMessage('Name must not be empty!')
        .trim().not().isEmpty().withMessage('Name must not contain space!'),
    check('surname').optional()
        .notEmpty().withMessage('Surname must not be empty!')
        .trim().not().isEmpty().withMessage('Surname must not contain space!'),
    check('email').optional()
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('password').optional()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 2,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1,
        }).withMessage('Password must be strong!'),
    check('address').optional(),
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
    check('isAdmin').optional()
        .isBoolean().withMessage('isAdmin must be set to true or false!'),
]

const registerValidationRules = [
    check('name')
        .notEmpty().withMessage('Name must not be empty!')
        .trim().not().isEmpty().withMessage('Name must not contain space!'),
    check('surname')
        .notEmpty().withMessage('Surname must not be empty!')
        .trim().not().isEmpty().withMessage('Surname must not contain space!'),
    check('email')
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 2,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1,
        }).withMessage('Password must be strong!'),
    check('address').optional(),
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
    check('isAdmin').optional()
        .isBoolean().withMessage('isAdmin must be set to true or false!'),
]

const loginValidationRules = [
    check('email')
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 2,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1,
        }),
]

module.exports = {updateProfileValidationRules, registerValidationRules, loginValidationRules}
