const {Activity} = require('../_helpers/db')
const userApi = require('./user-api')
module.exports = {
    createActivity,
    deleteParticipation,
    deleteActivity,
    createParticipation,
    modifyActivity,
    getActivity
}


async function createActivity(activityParams){
    const activityId = await new Promise((resolve) => {
        new Activity(activityParams).save((err,activity) =>{
                userApi.addActivity(activityParams.creator_username,activity._id)
                resolve(activity._id)
            }
        )
    })
    return Activity.findById(activityId)
}

async function modifyActivity(activityParams){
    return Activity.findByIdAndUpdate(activityParams.activity_id,activityParams,{new: true}).exec()
}

async function deleteActivity(activity_id,username){
    await userApi.deleteActivity(username,activity_id)
    return Activity.findByIdAndDelete(activity_id).exec()
}

async function createParticipation(activity_id,username){
    await userApi.addParticipation(username, activity_id)
    return Activity.findByIdAndUpdate(activity_id,{$addToSet:{participants : username}},{new : true}).exec()
}

async function deleteParticipation(activity_id,username){
    await userApi.deleteParticipation(username, activity_id)
    return Activity.findByIdAndUpdate(activity_id,{$pull :{participants : username}},{new : true}).exec()
}

async function getActivity(id){
    return Activity.findById(id).exec();
}





