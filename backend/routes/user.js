const express = require('express')
const userController = require('../controllers/user-controller')
const {check} = require('express-validator')
const exceptionHandler = require('../utils/exception-handler')
const router = express.Router()

router.get('/get-all', userController.getAll)

router.post('/populate-db', userController.populateDb)

router.post('/login', [
    check('email')
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('password')
        .notEmpty().withMessage('Password must not be empty!')
        .trim().not().contains(' ').withMessage('Password must not contain space!')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long!')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
], exceptionHandler, userController.login)

router.post('/register', [
    check('name')
        .notEmpty().withMessage('Name must not be empty!')
        .trim().not().contains(' ').withMessage('Name must not contain space!'),
    check('surname')
        .notEmpty().withMessage('Surname must not be empty!')
        .trim().not().contains(' ').withMessage('Surname must not contain space!'),
    check('email')
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('password')
        .notEmpty().withMessage('Password must not be empty!')
        .trim().not().contains(' ').withMessage('Password must not contain space!')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long!')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
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
    check('isAdmin')
        .isBoolean().withMessage('isAdmin must be set to true or false!')

], exceptionHandler, userController.register)

module.exports = router