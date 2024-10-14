const { validationResult } = require('express-validator')

const exceptionHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({message: errors.array()})
    }

    next()
}

module.exports = exceptionHandler