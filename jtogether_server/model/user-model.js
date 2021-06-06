const userApi = require('../apis/user-api');

const USER_NOT_FOUND = 'Utente non trovato, username: '
const CREDENTIAL_ALREADY_PRESENT = 'Username o email già presenti'
const USER_MUST_DELETE_ACTIVITIES = 'Cancellare prima tutte le attività'

module.exports = {
    deleteUser,
    updateUser,
    deleteParticipation,
    createParticipation,
    deleteActivity,
    createActivity,
    getUserFromUsername,
    getUserFromEmail,
    createUser
}

async function deleteUser({username}){
    const user = await userApi.getUserFromUsername(username)

    if(!user){
        throw USER_NOT_FOUND + username
    }
    if(user.created_activities.length > 0){
        throw USER_MUST_DELETE_ACTIVITIES
    }
    await userApi.deleteUser(username)
    return user.participated_activities
}

async function createUser(userParams){
    return userApi.createUser(userParams)
}

async function updateUser(userParams){
    const userFromUsername = userApi.getUserFromUsername(userParams.username)
    const userFromEmail = userApi.getUserFromUsername(userParams.email)

    if(userFromEmail || userFromUsername){
        throw CREDENTIAL_ALREADY_PRESENT
    }
    return (await userApi.updateUser(userParams)).toJSON()
}

async function deleteParticipation({username},{activity_id}){
    return userApi.deleteParticipation(username,activity_id)
}

async function createActivity({username},{activity_id}){
    return userApi.createActivity(username,activity_id)
}

async function deleteActivity({username},{activity_id}){
    return userApi.deleteActivity(username,activity_id)
}

async function createParticipation({username},{activity_id}){
    return userApi.createParticipation(username,activity_id)
}

async function getUserFromUsername({username}){
    return userApi.getUserFromUsername(username)
}

async function getUserFromEmail({email}){
    return userApi.getUserFromEmail(email)
}
