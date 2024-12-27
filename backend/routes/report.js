const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report-controller')

router.get('/generate', reportController.generateReport)

module.exports = router