const activityApi = require('../apis/activity-api');

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

async function modifyActivity(activityParams){
    return (await activityApi.modifyActivity(activityParams)).toJSON()
}

async function deleteActivity({id}){
    return activityApi.deleteActivity(id)
}

async function creationParticipation(activityParams){
    // get user and insert activity in participation
}

async function deleteParticipation(activityParams){

}



