const activityApi = require('../apis/activity-api');
const userApi = require('../apis/user-api');

const ACTIVITY_NOT_FOUND_ERROR = 'Attività non trovata'
const USER_NOT_FOUND_ERROR = 'Utente non trovato'

module.exports = {
    createActivity,
    creationParticipation,
    deleteParticipation,
    deleteActivity,
    modifyActivity
}
async function createActivity(activityParams,{username}){
    activityParams.creator_username = username
    activityParams.participants = [username]
    return (await activityApi.createActivity(activityParams)).toJSON()
}

async function modifyActivity(activityParams){
    return (await activityApi.modifyActivity(activityParams)).toJSON()
}

async function deleteActivity({id}){
    return activityApi.deleteActivity(id)
}

async function creationParticipation(participationParams){
    await checkUserAndActivity(participationParams)
    return (await activityApi.createParticipation(participationParams)).toJSON()
}

async function deleteParticipation(participationParams){
    await checkUserAndActivity(participationParams)
    return (await activityApi.deleteParticipation(participationParams)).toJSON()
}

async function checkUserAndActivity(participationParams){
    const activity = await activityApi.getActivity(participationParams.activity_id)
    const user = await userApi.getUserFromUsername(participationParams.username)
    if(!user){
        throw USER_NOT_FOUND_ERROR
    }
    if(!activity){
        throw ACTIVITY_NOT_FOUND_ERROR
    }
}



