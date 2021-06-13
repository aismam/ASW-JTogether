const {Chat,Message} = require('../_helpers/db')

module.exports = {
    createChat,
    createMessage,
    getChats,
    getAllMessages,
    deleteChat
}

async function createChat(activity_id){
    return new Chat(activity_id).save()
}

async function createMessage(messageParams){
    return new Message(messageParams).save()
}

async function getChats(username_id){

}

async function getAllMessages(chat_id){

}

async function deleteChat(chat_id){

}
