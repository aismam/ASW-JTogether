const express = require('express');
const router = express.Router();
const activityModel = require('../model/activity-model')
const userModel = require('../model/user-model')
const validator = require('../validators/validator')
const activityValidator = require('../validators/validator-activity')
const jwt = require('../_helpers/jwt')
const sendMessage = require('./controller-util')

const DELETION_SUCCESSFUL_MESSAGE = 'Attività cancellata'
const ACTIVITY_MODIFIED_MESSAGE = name => `L'attività ${name} è stata modificata`
const ACTIVITY_DELETED_MESSAGE = name => `L'attività ${name} è stata cancellata`

module.exports = socketController => {
    router.post('/create-activity',jwt.authenticateJWT,activityValidator.activityCreationRules,validator,createActivity)
    router.post('/modify-activity',jwt.authenticateJWT,activityValidator.activityModificationRules,validator,modifyActivity)
    router.post('/delete-activity',jwt.authenticateJWT,activityValidator.activityDeletionRules,validator,deleteActivity)
    router.post('/create-participation',jwt.authenticateJWT,activityValidator.participationRules,validator,createParticipation)
    router.post('/delete-participation',jwt.authenticateJWT,activityValidator.participationRules,validator,deleteParticipation)

    return router;

    async function createActivity(req,res,next){
        activityModel.createActivity(req.body,req.user)
            .then(activity => {
                userModel.createActivity(req.user,{activity_id : activity._id})
                res.json(activity.toJSON())
            })
            .catch(err => next(err))
    }

    async function modifyActivity(req,res,next){
        activityModel.modifyActivity(req.body,req.user)
            .then(modifiedActivity => {
                socketController.notify(ACTIVITY_MODIFIED_MESSAGE(modifiedActivity.name))
                res.json(modifiedActivity.toJSON())
            })
            .catch(err => next(err))
    }

    async function deleteActivity(req,res,next){
        Promise.all([userModel.deleteActivity(req.user, req.body),activityModel.deleteActivity(req.body,req.user)])
            .then(values => {
                const users = values[0]
                const deletedActivity = values[1]
                users.forEach(user => socketController.notify(user.username,ACTIVITY_MODIFIED_MESSAGE(deletedActivity.name)))
            })
            .then(() => sendMessage(res,DELETION_SUCCESSFUL_MESSAGE))
            .catch(err => next(err))
    }

    async function createParticipation(req,res,next){
        userModel.createParticipation(req.user,req.body)
            .then(() => activityModel.createParticipation(req.body,req.user))
            .then(activity => res.json(activity.toJSON()))
            .catch(err => next(err))
    }

    async function deleteParticipation(req,res,next){
        userModel.deleteParticipation(req.body,req.user)
            .then(() => activityModel.deleteParticipation(req.body,req.user))
            .then(activity => res.json(activity.toJSON()))
            .catch(err => next(err))
    }
};
