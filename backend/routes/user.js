const express = require('express')
const userController = require('../controllers/user-controller')
const validationExceptionHandler = require('../utils/validation-exception-handler')
const authenticate = require('../security/authenticateJWT')
const {
    updateProfileValidationRules,
    registerValidationRules,
    loginValidationRules
} = require("./validators/user-validator");
const router = express.Router()

router.get('/get-all', authenticate, userController.getAll)

router.get('/get-user/:id', authenticate, userController.getById)

router.post('/populate-db', userController.populateDb)

router.post('/login', loginValidationRules, validationExceptionHandler, userController.login)

router.post('/register', registerValidationRules, validationExceptionHandler, userController.register)

router.post('/logout', userController.logout)

router.put('/edit-profile/:id', authenticate, updateProfileValidationRules, validationExceptionHandler, userController.editProfile)

module.exports = router