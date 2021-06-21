const bcrypt = require('bcryptjs')

const SALT_ROUNDS = 12

module.exports = {
    crypt,
    compareSync
}

async function crypt(data){
    return bcrypt.hash(data, SALT_ROUNDS)
}

function compareSync(data,digestedData){
    return bcrypt.compareSync(data,digestedData)
}
