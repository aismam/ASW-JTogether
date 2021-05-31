const activityApi = require('../apis/activity-api');
const userApi = require('../apis/user-api');

const ACTIVITY_NOT_FOUND_ERROR = 'Attività non trovata'
const NOT_ALLOWED_ERROR = 'Utente non autorizzato'

module.exports = {
    createActivity,
    creationParticipation,
    deleteParticipation,
    deleteActivity,
    modifyActivity
}
async function createActivity(activityParams,{username}){
    activityParams.creator_username = username
    return (await activityApi.createActivity(activityParams)).toJSON()
}

async function modifyActivity(activityParams,{username}){
    await checkUserAndActivity(activityParams.activity_id,username)
    return (await activityApi.modifyActivity(activityParams)).toJSON()
}

async function deleteActivity({activity_id},{username}){
    await checkUserAndActivity(activity_id,username)
    return activityApi.deleteActivity(activity_id) //TODO notifica tutti e togli le partecipazioni
}

async function creationParticipation({activity_id},{username}){
    await checkUserAndActivity(activity_id,username)
    return (await activityApi.createParticipation(activity_id,username)).toJSON()
}

async function deleteParticipation({activity_id},{username}){
    await checkUserAndActivity(activity_id,username)
    return (await activityApi.deleteParticipation(activity_id,username)).toJSON()
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



