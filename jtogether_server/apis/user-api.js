const {User} = require('../_helpers/db')

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
    clearNotifications,
    forgottenPassword
}

/* User */
async function createUser(userParams){
    return new User(userParams).save()
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

async function updateUser(username, userParams){
    return User.findOneAndUpdate({username:username},userParams).exec()
}
/* Activities */
async function createActivity(username,activity_id){
    return User.findOneAndUpdate({username:username},{$addToSet: {created_activities : activity_id }},{new : true}).exec()
}

async function deleteActivity(username,activity_id){
    await User.findOneAndUpdate({username : username},{$pull: {created_activities: activity_id}}).exec()
    const users = await User.find({participated_activities: activity_id} ).exec()
    users.forEach(user => this.deleteParticipation(user.username,activity_id))
    return users
}
/* Notifications */
async function clearNotifications(username){
    return User.findOneAndUpdate({username: username},{$set: {notifications: []}}, {new : true}).exec()
}

async function createNotification(username,notificationParams){
    return User.findOneAndUpdate({username: username},{$push: {notifications: notificationParams}}, {new : true}).exec()
}
/* Participation */
async function createParticipation(username,activity_id){
    return User.findOneAndUpdate({username : username},{$addToSet: {participated_activities : activity_id}},{new : true}).exec()
}

async function deleteParticipation(username,activity_id){
    return User.findOneAndUpdate({username : username},{$pull: {participated_activities : activity_id}},{new : true}).exec()
}

async function createChat(username, chat_id){
    return User.findOneAndUpdate({username:username}, {$addToSet: {chats: chat_id}}, {new : true}).exec()
}

/* Forgotten Password */
async function forgottenPassword(email, password){
    return User.findOneAndUpdate({email: email}, {hash: password}).exec()
}
