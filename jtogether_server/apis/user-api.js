const {User} = require('../_helpers/db')

module.exports = {
    createUser,
    getUserFromUsername,
    getUserFromEmail,
    updateUser,
    deleteUser
}

async function createUser(userParams){
    return new User(userParams).save()
}

async function updateUser(userParams){
    return User.findByIdAndUpdate(userParams.id,userParams).exec()
}

async function deleteUser(username){
    return User.findOneAndDelete({username : username}).exec()
}

async function getUserFromUsername(username){
    return User.findOne({username: username}).exec()
}

async function getUserFromEmail(email){
    return User.findOne({email: email}).exec()
}
