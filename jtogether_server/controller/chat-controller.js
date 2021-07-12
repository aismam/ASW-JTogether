const express = require('express');
const router = express.Router();
const chatValidator = require('../validators/validator-chat')
const activityModel = require('../model/activity-model')
const validator = require('../validators/validator')
const jwt = require('../_helpers/jwt')

module.exports = socketController => {

    router.post('/create-message', jwt.authenticateJWT, chatValidator.messageIncomingRule,validator, createMessage)
    return router;

    async function createMessage(req,res,next){
        activityModel.createMessage(req.user,req.body)
            .then(message => {
                socketController.sendMessage(req.body.activity_id,JSON.stringify(message.toJSON()))
                res.json(message.toJSON())
            })
            .catch(err => next(err))
    }
}


