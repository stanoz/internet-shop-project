const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const jwtToken = req.cookies.token

    if (!jwtToken) {
        return res.status(401).json({message: 'Access denied!'})
    }

    try {
        const verified = jwt.verify(jwtToken, 'AccessToken')
        req.user = verified //info for other middleware about user that was attached in payload, in my case email
        next()
    } catch (err) {
        return res.status(401).json({message: 'Invalid token!'})
    }
}

module.exports = authenticateJWT