const express = require('express');
const router = express.Router();
const chatModel = require('../model/chat-model')

const activityModel = require('../model/activity-model')
const userModel = require('../model/user-model')
const validator = require('../validators/validator')

const jwt = require('../_helpers/jwt')
const sendMessage = require('./controller-util')

module.exports = socketController => {

}
