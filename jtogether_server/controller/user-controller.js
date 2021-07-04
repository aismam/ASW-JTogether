const express = require('express');
const router = express.Router();
const userModel = require('../model/user-model')
const activityModel = require('../model/activity-model')
const authModel = require('../model/auth-model')
const validator = require('../validators/validator')
const authValidator = require('../validators/validator-auth')
const jwt = require('../_helpers/jwt')
const sendMessage = require('./controller-util')

const USER_DELETED_MESSAGE = 'Utente cancellato con successo'

router.post('/update-user',jwt.authenticateJWT,authValidator.updateUserValidationRules,validator,updateUser)
router.post('/delete-user',jwt.authenticateJWT,authValidator.tokenValidationRules,validator,deleteUser)
router.post('/clear-notifications',jwt.authenticateJWT,clearNotifications)
router.post('/forgotten-password', forgottenPassword)
module.exports = router;

async function deleteUser(req,res,next){
    authModel.logout(req.body,req.user)
        .then(() => userModel.deleteUser(req.user))
        .then(activitiesParticipated =>
            activitiesParticipated.forEach(a => activityModel.deleteParticipation({activity_id: a},req.user)))
        .then(() => sendMessage(res,USER_DELETED_MESSAGE))
        .catch(err => next(err))
}
async function updateUser(req,res,next){
    userModel.updateUser(req.user, req.body)
        .then(user => res.json(user.toJSON()))
        .catch(err => next(err))
}

async function clearNotifications(req,res,next){
    userModel.clearNotifications(req.user)
        .then(u => res.json(u.toJSON()))
        .catch(e => next(e))
}

async function forgottenPassword(req,res,next){
    userModel.forgottenPassword(req.body)
        .then(u => res.json(u.toJSON()))
        .catch(e => next(e))
}
