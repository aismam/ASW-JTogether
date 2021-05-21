const activityApi = require('../apis/activity-api');

module.exports = {
    createActivity,
}

async function createActivity(activityParams){
    return activityApi.saveActivity(activityParams)
}
