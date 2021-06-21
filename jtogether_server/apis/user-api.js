const {User} = require('../_helpers/db')

const SALT_ROUNDS = 12

module.exports = {
    createUser,
    getUserFromUsername,
    getUserFromEmail,
    updateUser,
    deleteUser,
    createParticipation,
    deleteParticipation,
    createActivity,
    deleteActivity,
    createChat,
    createNotification,
    clearNotifications
}

async function createUser(userParams){
    return new User(userParams).save()
}

async function createActivity(username,activity_id){
    return User.findOneAndUpdate({username:username},{$addToSet: {created_activities : {activity_id: activity_id, is_muted: false} }},{new : true}).exec()
}

async function deleteActivity(username,activity_id){
    await User.findOneAndUpdate({username : username},{$pull: {created_activities: {activity_id: activity_id}}}).exec()
    const users = await User.find({participated_activities: {activity_id: activity_id}} ).exec()
    users.forEach(user => this.deleteParticipation(user.username,activity_id))
    return users
}

async function clearNotifications(username){
    return User.findOneAndUpdate({username: username},{$set: {notifications: []}}, {new : true}).exec()
}

async function createNotification(username,notificationText){
    return User.findOneAndUpdate({username: username},{$push: {notifications: notificationText}}, {new : true}).exec()
}

async function updateUser(username, userParams){
    userParams.hash = 'ciaoo'
    console.log(userParams)
    return User.findOneAndUpdate({username:username},userParams).exec()
}

async function createParticipation(username,activity_id){
    return User.findOneAndUpdate({username : username},{$addToSet: {participated_activities : {activity_id: activity_id, is_muted: false}}},{new : true}).exec()
}

async function deleteParticipation(username,activity_id){
    return User.findOneAndUpdate({username : username},{$pull: {participated_activities : { activity_id:  activity_id}}},{new : true}).exec()
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

async function createChat(username, chat_id){
    return User.findOneAndUpdate({username:username}, {$addToSet: {chats: chat_id}}, {new : true}).exec()
}
