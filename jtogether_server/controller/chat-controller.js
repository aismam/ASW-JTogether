const express = require('express');
const router = express.Router();
const chatModel = require('../model/chat-model')
const chatValidator = require('../validators/validator-chat')
const activityModel = require('../model/activity-model')
const validator = require('../validators/validator')
const jwt = require('../_helpers/jwt')

module.exports = socketController => {

    router.post('/send-message', jwt.authenticateJWT, chatValidator.messageIncomingRule,validator, receiveMessage)
    return router;

    async function createChat(req,res,next){
        chatModel.createChat(req.body)
            .then(chat => {
                userModel.createChat(req, {chat_id: chat._id})
                res.json(chat.toJSON())
            })
            .catch(err => next(err))
    }
}


