const {check} = require('express-validator')

const addReturnValidationRules = [
    check('orderId')
        .trim().notEmpty().withMessage('Order id is required!'),
    check('userEmail')
        .isEmail().withMessage('Invalid email address!')
        .normalizeEmail(),
    check('description')
        .trim().notEmpty().withMessage('Description is required!')
]

const editReturnValidationRules = [
    check('returnStatus')
        .trim().notEmpty().withMessage('Return status is required!')
        .isLength({min: 7, max: 9}).withMessage('Permitted values: PENDING, APPROVED, REJECTED, COMPLETED')
]

module.exports = {addReturnValidationRules, editReturnValidationRules}