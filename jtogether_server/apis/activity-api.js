const {Activity} = require('../_helpers/db')

module.exports = {
    createActivity,
    deleteParticipation,
    deleteActivity,
    createParticipation,
    modifyActivity,
    getActivity
}


async function createActivity(activityParams){
    return new Activity(activityParams).save()
}

async function modifyActivity(activityParams){
    return Activity.findByIdAndUpdate({_id: activityParams.id}).exec()
}

async function deleteActivity(activityId){
    return Activity.findOneAndDelete({_id: activityId}).exec()
}

async function createParticipation(participationParams){
    //return new User(participationParams).save()
}

async function deleteParticipation(participationParams){
    //return new Activity(participationParams).save()
}

async function getActivity(id){ // TODO dunno how to handle ids
    return Activity.findOne({id: id}).exec();
}





