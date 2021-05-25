const userApi = require('../apis/user-api');
const jwt = require('jsonwebtoken');


const USER_NOT_FOUND = 'Utente non trovato, username: '
const CREDENTIAL_ALREADY_PRESENT = 'Username o email già presenti'

module.exports = {
    deleteUser,
    updateUser
}

async function deleteUser({username}){
    const user = await userApi.deleteUser(username)
    if(!user){
        throw USER_NOT_FOUND + username
    }
}

async function updateUser(userParams){
    const userFromUsername = userApi.getUserFromUsername(userParams.username)
    const userFromEmail = userApi.getUserFromUsername(userParams.email)

    if(userFromEmail || userFromUsername){
        throw CREDENTIAL_ALREADY_PRESENT
    }

    return (await userApi.updateUser(userParams)).toJSON()
}
