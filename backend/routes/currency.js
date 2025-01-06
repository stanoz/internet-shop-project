// const express = require('express')
// const router = express.Router()
// const currencyController = require('../controllers/currency-controller')
//
// router.post('/api/get-exchange-rates', currencyController.exchange)
//
// module.exports = router

const express = require('express');
const router = express.Router();

router.post('/api/get-exchange-rates', async (req, res, next) => {
    try {
        const { default: currencyController } = await import('../controllers/currency-controller.js')
        await currencyController.exchange(req, res, next)
    } catch (error) {
        next(error)
    }
});

module.exports = router;
