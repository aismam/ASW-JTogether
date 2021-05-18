const {User} = require('../_helpers/db')

module.exports = {
    getUser,
    saveUser
}

async function getUser(username){
    return User.findOne({username: username});
}

function saveUser(userParams){
    return new User(userParams).save()
}



