const {Activity,User} = require('../_helpers/db')

module.exports = {
    createActivity,
    deleteParticipation,
    deleteActivity,
    createParticipation,
    modifyActivity,
    getActivity
}


async function createActivity(activityParams){
    return new Activity(activityParams).save((err,activity) =>{
        User.findByIdAndUpdate(activityParams.creator_username,{$addToSet: {activity_created : activity._id}})
    })
}

async function modifyActivity(activityParams){
    return Activity.findByIdAndUpdate(activityParams.id,activityParams).exec()
}

async function deleteActivity(activityId){
    return Activity.findByIdAndDelete(activityId).exec()
}

async function createParticipation({username,activity_id}){
    User.findByIdAndUpdate(username,{$addToSet: {activity_participated : activity_id}})
    return Activity.findByIdAndUpdate(activity_id,{$addToSet:{participants : username}})
}

async function deleteParticipation({username,activity_id}){
    User.findByIdAndUpdate(username,{pull: {activity_participated : activity_id}})
    return Activity.findByIdAndUpdate(username,{$pull :{participants : username}})
}

async function getActivity(id){
    return Activity.findById(id).exec();
}





