const userApi = require('../apis/user-api');
const bcrypt = require('bcryptjs')
const jwt = require('../_helpers/jwt')

const SALT_ROUNDS = 12
const USERNAME_ALREADY_TAKEN = 'Username già utilizzato'
const EMAIL_ALREADY_TAKEN = 'Email già utilizzato'
const LOGIN_FAILED = 'Username o password non corretti'
const WRONG_TOKEN_MATCH = 'I token non sono dello stesso user'

module.exports = {
    signup,
    login,
    logout
};

async function signup(userParams){
    if(await userApi.getUserFromUsername(userParams.username)){
        throw USERNAME_ALREADY_TAKEN
    }
    if(await userApi.getUserFromEmail(userParams.email)){
        throw EMAIL_ALREADY_TAKEN
    }

    return bcrypt.hash(userParams.password, SALT_ROUNDS)
        .then(hash => {
            userParams.hash = hash;
            userApi.createUser(userParams)
        })
}

async function login(userParams) {
    const user = userParams.email ? await userApi.getUserFromEmail(userParams.email) :
                                    await userApi.getUserFromUsername(userParams.username)

    if (bcrypt.compareSync(userParams.password, user.hash)) {
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

async function logout({refresh_token},{username}){
    if(refresh_token !== username){
        throw WRONG_TOKEN_MATCH
    }
    jwt.removeToken(refresh_token)
}

