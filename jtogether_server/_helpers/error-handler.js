
module.exports = {errorHandler,resourceNotFoundHandler}

function errorHandler(err, req, res, notUsed) {
    if (typeof (err) === 'string') {
        return res.status(400).json({ message: err })
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message })
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token' })
    }

    if (err.name === 'PageNotFound') {
    }

    return res.status(500).json({ message: err.message })
}

function resourceNotFoundHandler(req, res){
    return res.status(404).json({ message: 'Resource not found' })
}
