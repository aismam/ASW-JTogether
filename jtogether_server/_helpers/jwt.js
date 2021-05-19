const jwt = require('jsonwebtoken');
const config = require('../config.json')

const EXPIRATION_TIME_ACCESS_TOKEN = '20m'
const EXPIRATION_TIME_REFRESH_TOKEN = '120d'

let refreshTokensList = [];

module.exports = {
    getAccessToken,
    getRefreshToken,
    pushRefreshToken,
    removeToken,
    authenticateJWT,
    clearTokens,
    refreshToken
}

async function refreshToken(req,res){
    const { token } = req.body

    if (!token) {
        return res.sendStatus(401)
    }
    if (!refreshTokensList.includes(token)) {
        return res.sendStatus(403)
    }

    return jwt.verify(token, config.secret, (err, user) =>
        err ? res.sendStatus(403) : res.json({token: getAccessToken(user)})
    )
}

async function clearTokens(){
    refreshTokensList.forEach(t =>{
        jwt.verify(t,config.secret,(err)=> {
            if (err) {
                refreshTokensList = refreshTokensList.filter(e => e !== t)
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
    refreshTokensList = refreshTokensList.filter(t => t !== token);
}




