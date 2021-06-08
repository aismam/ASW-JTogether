const {Activity} = require('../_helpers/db')

module.exports = {
    createActivity,
    deleteParticipation,
    deleteActivity,
    createParticipation,
    modifyActivity,
    getActivity,
    getActivities
}

async function createActivity(activityParams){
    return new Activity(activityParams).save()
}

async function modifyActivity(activityParams){
    return Activity.findByIdAndUpdate(activityParams.activity_id,activityParams,{new: true}).exec()
}

async function deleteActivity(activity_id){
    return Activity.findByIdAndDelete(activity_id).exec()
}

async function createParticipation(activity_id,username){
    return Activity.findByIdAndUpdate(activity_id,{$addToSet:{participants : username}},{new : true}).exec()
}

async function deleteParticipation(activity_id,username){
    return Activity.findByIdAndUpdate(activity_id,{$pull :{participants : username}},{new : true}).exec()
}

async function getActivity(id){
    return Activity.findById(id).exec();
}

async function getActivities(ids){
    return Activity.find({_id : ids}).exec()
}





