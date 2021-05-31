const {User} = require('../_helpers/db')

module.exports = {
    createUser,
    getUserFromUsername,
    getUserFromEmail,
    updateUser,
    deleteUser,
    addParticipation,
    deleteParticipation,
    addActivity,
    deleteActivity,
}

async function createUser(userParams){
    return new User(userParams).save()
}

async function addActivity(username,activity_id){
    return User.findOneAndUpdate({username:username},{$addToSet: {activity_created : activity_id}},{new : true}).exec()
}
async function deleteActivity(username,activity_id){
    return User.findOneAndUpdate({username:username},{$pull: {activity_created : activity_id}},{new : true}).exec()
}

async function updateUser(userParams){
    return User.findOneAndUpdate({username:userParams.username},userParams).exec()
}

async function addParticipation(username,activity_id){
    return User.findOneAndUpdate({username : username},{$addToSet: {activity_participated : activity_id}},{new : true}).exec()
}

async function deleteParticipation(username,activity_id){
    return User.findOneAndUpdate({username : username},{$pull: {activity_participated : activity_id}},{new : true}).exec()
}

async function deleteUser(username){
    return User.findOneAndDelete({username:username}).exec()
}

async function getUserFromUsername(username){
    return User.findOne({username:username}).exec()
}

async function getUserFromEmail(email){
    return User.findOne({email: email}).exec()
}
