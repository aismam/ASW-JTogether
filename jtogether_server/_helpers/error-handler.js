module.exports = errorHandler;

function errorHandler(err, req, res) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }
    switch (err.name) {
        case 'ValidationError':
            // mongoose validation error
            return res.status(400).json({ message: err.message });
        case 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ message: 'Invalid Token' });
        default:
            // default to 500 server error
            return res.status(500).json({ message: err});
    }
}
