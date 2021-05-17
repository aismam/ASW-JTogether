const userService = require('../users/user-api');
const bcrypt = require('bcryptjs')
const jwt = require('../_helpers/jwt')

const SALT_ROUNDS = 12
const USERNAME_ALREADY_TAKEN = 'Username already taken'
const NO_PASSWORD = 'No password'
const LOGIN_FAILED = 'Username or password incorrect'


module.exports = {
    signup,
    login,
    logout
};

async function signup(userParams){
    if(await userService.getUser(userParams.username)){
        throw USERNAME_ALREADY_TAKEN
    }
    if(userParams.password) {
        return bcrypt.hash(userParams.password, SALT_ROUNDS)
            .then(hash => {
                userParams.hash = hash;
                /*userService.saveUser(userParams)
                    .then(()=> return 'user create successfully')*/
            })
    }
    else {
        throw NO_PASSWORD
    }
}

async function login({username,password}) {
    const user = {username: 'Lorenzo', hash: 'gianluca'}//await userService.getUser(username)

    if (user && password == user.hash/*bcrypt.compareSync(password, user.hash)*/) {
        const accessToken = jwt.getAccessToken(user)
        const refreshToken = jwt.getRefreshToken(user)

        jwt.pushRefreshToken(refreshToken);

        return {
            access_token : accessToken,
            refresh_token : refreshToken
        }
    }
    else throw LOGIN_FAILED
}

async function logout(token){
    jwt.removeToken(token)
}

async function throwError(error){
    throw new Error(error)
}

