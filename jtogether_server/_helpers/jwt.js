const jwt = require('jsonwebtoken');
const config = require('../config.json')

const EXPIRATION_TIME_ACCESS_TOKEN = '120d'//'20m'
const EXPIRATION_TIME_REFRESH_TOKEN = '120d'
const REFRESH_TOKEN_NOT_PRESENT = 'Refresh token non presente'

let refreshTokensList = []

module.exports = {
    getAccessToken,
    getRefreshToken,
    pushRefreshToken,
    removeToken,
    authenticateJWT,
    clearTokens,
    refreshToken,
    verify,
    registeredTokenCheck
}
async function verify(token){
    return new Promise((resolve, reject) =>
        jwt.verify(token,config.secret,(err,user) => user ? resolve(user) : reject(err))
    )
}

async function refreshToken(req,res){
    const token = req.query.refresh_token

    if (!token) {
        return res.sendStatus(401)
    }
    if (!refreshTokensList.includes(token)) {
        return res.sendStatus(403)
    }

    return jwt.verify(token, config.secret, (err, user) =>
        err ? res.sendStatus(403) : res.json({access_token: getAccessToken(user)})
    )
}

async function clearTokens(){
    refreshTokensList.forEach(t =>{
        jwt.verify(t,config.secret,(err)=> {
            if (err) {
                removeToken(t)
            }
        })
    })
}

async function authenticateJWT (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            req.token = token
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
    refreshTokensList.push(token)
}

function removeToken(token){
    if(!this.registeredTokenCheck(token)){
        throw REFRESH_TOKEN_NOT_PRESENT
    }
    refreshTokensList = refreshTokensList.filter(t => t !== token);
}

function registeredTokenCheck(token){
    return refreshTokensList.includes(token)
}




