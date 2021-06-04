const userModel = require('../model/user-model');
const bcrypt = require('bcryptjs')
const jwt = require('../_helpers/jwt')

const SALT_ROUNDS = 12
const USERNAME_ALREADY_TAKEN = 'Username già utilizzato'
const EMAIL_ALREADY_TAKEN = 'Email già utilizzata'
const LOGIN_FAILED = 'Username o password non corretti'
const WRONG_TOKEN_MATCH = 'I token non sono dello stesso user'

module.exports = {
    signup,
    login,
    logout,
    logToken
};

async function signup(userParams){
    if(await userModel.getUserFromUsername(userParams)){
        throw USERNAME_ALREADY_TAKEN
    }
    if(await userModel.getUserFromEmail(userParams)){
        throw EMAIL_ALREADY_TAKEN
    }

    return bcrypt.hash(userParams.password, SALT_ROUNDS)
        .then(hash => {
            userParams.hash = hash;
            userModel.createUser(userParams)
        })
}

async function login(userParams) {
    const user = userParams.email ? await userModel.getUserFromEmail(userParams) :
                                    await userModel.getUserFromUsername(userParams)

    if (user && bcrypt.compareSync(userParams.password, user.hash)) {
        const accessToken = jwt.getAccessToken(user)
        const refreshToken = jwt.getRefreshToken(user)

        jwt.pushRefreshToken(refreshToken);
        await jwt.clearTokens()
        return {
            ...user.toJSON(),
            access_token : accessToken,
            refresh_token : refreshToken
        }
    }
    else {
        throw LOGIN_FAILED
    }
}

async function logToken({refresh_token}){
    const user = await jwt.verify(refresh_token)
    return userModel.getUserFromUsername(user);
}

async function logout({refresh_token},{username}){
    return jwt.verify(refresh_token)
        .then(user => {
            if(user.username !== username){
                throw WRONG_TOKEN_MATCH
            }
            jwt.removeToken(refresh_token)
        })
}

