const jwt = require('jsonwebtoken');
const config = require('../config.json')

const EXPIRATION_TIME_ACCESS_TOKEN = '20m'
const EXPIRATION_TIME_REFRESH_TOKEN = '120d'

var refreshTokens = [];

module.exports = {
    getAccessToken,
    getRefreshToken,
    pushRefreshToken,
    removeToken,
    authenticateJWT,
    refreshTokens
}


async function refreshToken(res,req,next){
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        return getAccessToken(user);
    })
}

function authenticateJWT (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

function getAccessToken(user){
    return jwt.sign({ username: user.username},
        config.secret,
        { expiresIn: EXPIRATION_TIME_ACCESS_TOKEN})
}

function getRefreshToken(user) {
    return jwt.sign({username: user.username}, config.secret, { expiresIn: EXPIRATION_TIME_REFRESH_TOKEN})
}

function pushRefreshToken(token){
    refreshTokens.push(token)
}

function removeToken(token){
    refreshTokens = refreshTokens.filter(t => t !== token);
}




