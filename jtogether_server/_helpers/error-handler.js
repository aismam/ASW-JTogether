
module.exports = errorHandler

function errorHandler(req,res,err) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err })
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        console.log('mannaggia4')

        return res.status(400).json({ message: err.message })
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        console.log('mannaggia3')

        return res.status(401).json({ message: 'Invalid Token' })
    }

    if (err.name === 'PageNotFound') {
        console.log('mannaggia2')
        return res.status(404).json({ message: err.message })
    }

    // default to 404 server error
    return res.status(404).json({ message: 'Page not found' })
}