const express = require('express')
const router = express.Router()
const returnController = require('../controllers/return-controller')
const validationExceptionHandler = require('../utils/validation-exception-handler')
const authenticate = require('../security/authenticateJWT')
const {addReturnValidationRules, editReturnValidationRules} = require("./validators/return-validator");

router.get('/get-all', authenticate, returnController.getAll)

router.get('/get-return/:returnId', returnController.getReturn)

router.post('/create-return', addReturnValidationRules, validationExceptionHandler, returnController.createReturn)

router.put('/edit-return/:returnId', authenticate, editReturnValidationRules, validationExceptionHandler, returnController.editReturn)

module.exports = router