const { validationResult } = require('express-validator')

const exceptionHandler = (req, res, next, err) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({message: errors.array()})
    }

    if (err) {
        return res.status(409).json({message: err})
    }

    next()
}

module.exports = exceptionHandler