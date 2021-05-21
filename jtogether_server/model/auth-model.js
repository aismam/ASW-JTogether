const userApi = require('../apis/user-api');
const bcrypt = require('bcryptjs')
const jwt = require('../_helpers/jwt')

const SALT_ROUNDS = 12
const USERNAME_ALREADY_TAKEN = 'Username già utilizzato'
const LOGIN_FAILED = 'Username o password non corretti'


module.exports = {
    signup,
    login,
    logout
};

async function signup(userParams){
    if(await userApi.getUser(userParams.username)){
        throw USERNAME_ALREADY_TAKEN
    }

    return bcrypt.hash(userParams.password, SALT_ROUNDS)
        .then(hash => {
            userParams.hash = hash;
            userApi.saveUser(userParams)
        })
}

async function login({username,password}) {
    const user = await userApi.getUser(username)

    if (user && bcrypt.compareSync(password, user.hash)) {
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

async function logout(token){
    jwt.removeToken(token)
}

