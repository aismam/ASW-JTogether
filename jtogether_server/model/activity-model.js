const activityApi = require('../apis/activity-api');

const ACTIVITY_NOT_FOUND_ERROR = 'Attività non trovata'
const NOT_ALLOWED_ERROR = 'Utente non autorizzato'

module.exports = {
    createActivity,
    createParticipation,
    deleteParticipation,
    deleteActivity,
    modifyActivity
}
async function createActivity(activityParams,{username}){
    activityParams.creator_username = username
    return activityApi.createActivity(activityParams)
}

async function modifyActivity(activityParams,{username}){
    await checkUserAndActivity(activityParams.activity_id,username)
    return activityApi.modifyActivity(activityParams)
}

async function deleteActivity({activity_id},{username}){
    await checkUserAndActivity(activity_id,username)
    return activityApi.deleteActivity(activity_id)
}

async function createParticipation({activity_id},{username}){
    return activityApi.createParticipation(activity_id,username)
}

async function deleteParticipation({activity_id},{username}){
    return activityApi.deleteParticipation(activity_id,username)
}

async function checkUserAndActivity(activityId,username){
    const activity = await activityApi.getActivity(activityId)
    if(!activity){
        throw ACTIVITY_NOT_FOUND_ERROR
    }

    if(activity.creator_username !== username){
        throw NOT_ALLOWED_ERROR
    }

}



