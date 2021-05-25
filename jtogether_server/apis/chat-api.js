const {Chat,Message} = require('../_helpers/db')

module.exports = {
    createChat,
    createMessage
}

async function createChat(chatParams){
    return new Chat(chatParams).save()
}

async function createMessage(messageParams){
    return new Message(messageParams).save()
}
