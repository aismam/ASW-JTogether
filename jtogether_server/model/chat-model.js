const chatApi = require('../apis/chat-api')

module.exports = {
    createChat,
    createMessage
}

async function createChat({activity_id}){
    return chatApi.createChat(activity_id);
}

async function createMessage(messageParams){
    return chatApi.createMessage(messageParams);
}
