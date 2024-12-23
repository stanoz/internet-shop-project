exports.errorHandler = (err, req, res, next) => {
    console.error('--------ERROR OCCURRED----------')
    console.error(err)
    console.error('-------END OF ERROR LOG--------')

    let statusCode = 409
    let errorMessage = 'Something went wrong! Please try again later.'
    if (err.status) {
        statusCode = err.status
    }

    if (err.message) {
        errorMessage = err.message
    }

    res.status(statusCode).json({message: errorMessage})
}